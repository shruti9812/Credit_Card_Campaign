from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
import pandas as pd
from docx import Document
import openai
import random
import sqlalchemy as db

app = FastAPI()

# Set Azure OpenAI API key and endpoint
openai.api_type = "azure"
openai.api_key = "4b81012d55fb416c9e398f6149c3071e"
openai.api_base = 'https://ey-sandbox.openai.azure.com'
openai.api_version = "2023-05-15"
deployment_name = "text-davinci-003"

class OfferResponse(BaseModel):
    common_offer: str
    user_data: dict

def get_mysql_data():
    engine = db.create_engine('mysql+mysqlconnector://root:Admin*123@127.0.0.1/creditcard_campaign')
    connection = engine.connect()
    
    query = 'SELECT CardId, TransactionAmount FROM cc_transactions'
    df = pd.read_sql(query, connection)
    connection.close()
    
    return df

def read_previous_offers(doc_path):
    document = Document(doc_path)
    offers = [para.text.strip() for para in document.paragraphs if para.text.strip()]
    return offers

def generate_campaign_offer(user_data, previous_offers, deployment_name):
    random_factor = random.randint(1, 100)
    prompt = (
        f"Previous offers:\n{previous_offers}\n\n"
        f"Combined User Data:\n{user_data}\n\n"
        f"Generate a common campaign offer for the above combined user data with a random element {random_factor}."
    )
    
    try:
        response = openai.Completion.create(
            engine=deployment_name,
            prompt=prompt,
            max_tokens=150
        )
        offer = response.choices[0].text.strip()
        return offer
    except openai.error.InvalidRequestError as e:
        print(f"InvalidRequestError: {e}")
        return None

def extract_cashback_rules(offer_text):
    """
    Extract cashback rules from the offer text.
    For simplicity, assuming the offer text contains lines like "X-Y: Z% cashback".
    """
    cashback_rules = {}
    lines = offer_text.split('\n')
    for line in lines:
        if ':' in line and 'cashback' in line:
            range_part, cashback_part = line.split(':')
            range_part = range_part.strip()
            cashback_percent = float(cashback_part.strip().replace('% cashback', '')) / 100
            cashback_rules[range_part] = cashback_percent
    return cashback_rules

def calculate_cashback(user_data, cashback_rules, budget=500000, min_cashback=80, max_cashback=980):
    user_data['Cashback'] = min_cashback
    remaining_budget = budget - min_cashback * len(user_data)
    total_transaction_amount = user_data['TransactionAmount'].sum()
    user_data = user_data.sort_values(by='TransactionAmount', ascending=False).reset_index(drop=True)
    
    high_transaction_indices = user_data[user_data['TransactionAmount'] > 30000].index
    high_transaction_count = len(high_transaction_indices)
    total_high_transaction_amount = user_data.loc[high_transaction_indices, 'TransactionAmount'].sum()
    
    if high_transaction_count > 0:
        max_cashback_per_high_transaction = min(max_cashback, remaining_budget / high_transaction_count)
        for idx in high_transaction_indices:
            cashback = min(user_data.at[idx, 'TransactionAmount'] * max_cashback_per_high_transaction / total_high_transaction_amount, max_cashback)
            user_data.at[idx, 'Cashback'] = cashback
            remaining_budget -= cashback
    
    for idx, row in user_data.iterrows():
        if idx in high_transaction_indices:
            continue
        transaction_amount = row['TransactionAmount']
        
        cashback_rate = None
        for rule_range, rule_rate in cashback_rules.items():
            min_amount, max_amount = map(int, rule_range.split('-'))
            if min_amount <= transaction_amount <= max_amount:
                cashback_rate = rule_rate
                break
        
        if cashback_rate is None:
            continue
        
        cashback = min(max_cashback, transaction_amount * cashback_rate)
        cashback = max(min_cashback, cashback)
        cashback = min(cashback, remaining_budget)
        
        user_data.at[idx, 'Cashback'] = cashback
        remaining_budget -= cashback
    
    return user_data

def save_offer_to_db(common_offer, user_data):
    connection = mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password="Admin*123",
        database='creditcard_campaign'
    )
    cursor = connection.cursor()
    for idx, row in user_data.iterrows():
        card_id = row['CardId']
        cashback = row['Cashback']
        suggested_transaction = row['SuggestedTransactionAmount']
        suggested_cashback = row['SuggestedCashbackAmount']
        max_cashback = row['MaxCashbackLimit']
        cursor.execute(
            "INSERT INTO campaign_offers (CardId, Offer, Cashback, SuggestedTransactionAmount, SuggestedCashbackAmount, MaxCashbackLimit) VALUES (%s, %s, %s, %s, %s, %s)",
            (card_id, common_offer, cashback, suggested_transaction, suggested_cashback, max_cashback)
        )
    connection.commit()
    cursor.close()
    connection.close()

@app.get("/generate_offer", response_model=OfferResponse)
async def generate_offer():
    try:
        user_data = get_mysql_data()
        previous_offers = read_previous_offers('Dec22 Campaign.docx')
        user_data_str = user_data.to_string(index=False)
        common_offer = generate_campaign_offer(user_data_str, previous_offers, deployment_name)
        
        if not common_offer:
            raise HTTPException(status_code=500, detail="Failed to generate a common offer.")
        
        cashback_rules = extract_cashback_rules(common_offer)
        user_data = calculate_cashback(user_data, cashback_rules)
        user_data['SuggestedTransactionAmount'] = user_data['TransactionAmount'].apply(lambda x: x * random.uniform(1.5, 2.0))
        user_data['SuggestedCashbackAmount'] = user_data['SuggestedTransactionAmount'].apply(
            lambda x: next((x * rate for range_, rate in cashback_rules.items() if int(range_.split('-')[0]) <= x <= int(range_.split('-')[1])), 0)
        )
        max_cashback_limit = 500000 / len(user_data)
        user_data['MaxCashbackLimit'] = max_cashback_limit
        
        save_offer_to_db(common_offer, user_data)
        
        response_data = {
            "common_offer": common_offer,
            "user_data": user_data.to_dict(orient='records')
        }
        return response_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
