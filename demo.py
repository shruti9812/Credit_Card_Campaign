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
deployment_name="text-davinci-003"

def get_mysql_data():
    engine = db.create_engine('mysql+mysqlconnector://test:test*123@127.0.0.1/creditcard_campaign')
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
        f"Generate Cashback amount as it is suggested from the random_factor % of Transaction amount and generate different output everytime."
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
    return {
        '0-100000': 0.01,
        '100001-200000': 0.02,
        '200001-300000': 0.03,
        '300001-500000': 0.04
    }

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

def suggest_transaction_amounts(user_data, budget):
    max_cashback_limit = budget / len(user_data)
    user_data['SuggestedTransactionAmount'] = user_data['TransactionAmount'] * 1.2
    user_data['SuggestedCashbackAmount'] = user_data['SuggestedTransactionAmount'] * 0.02
    user_data['SuggestedCashbackAmount'] = user_data['SuggestedCashbackAmount'].apply(lambda x: min(x, max_cashback_limit))
    user_data['MaximumCashbackLimit'] = max_cashback_limit
    return user_data

def save_offer_to_db(common_offer, user_data):
    connection = mysql.connector.connect(
        host='127.0.0.1',
        user='test',
        password="test*123",
        database='creditcard_campaign'
    )
    cursor = connection.cursor()
    for idx, row in user_data.iterrows():
        card_id = row['CardId']
        cashback = row['Cashback']
        suggested_transaction_amount = row['SuggestedTransactionAmount']
        suggested_cashback_amount = row['SuggestedCashbackAmount']
        maximum_cashback_limit = row['MaximumCashbackLimit']
        cursor.execute(
            "INSERT INTO campaign_offers (CardId, Offer, Cashback, SuggestedTransactionAmount, SuggestedCashbackAmount, MaximumCashbackLimit) VALUES (%s, %s, %s, %s, %s, %s)",
            (card_id, common_offer, cashback, suggested_transaction_amount, suggested_cashback_amount, maximum_cashback_limit)
        )
    connection.commit()
    cursor.close()
    connection.close()

class OfferRequest(BaseModel):
    doc_path: str

class OfferResponse(BaseModel):
    offer: str
    user_data: dict

@app.post("/generate_offer/", response_model=OfferResponse)
async def generate_offer(request: OfferRequest):
    try:
        user_data = get_mysql_data()
        previous_offers = read_previous_offers(request.doc_path)
        user_data_str = user_data.to_string(index=False)
        common_offer = generate_campaign_offer(user_data_str, previous_offers, deployment_name)
        
        if not common_offer:
            raise HTTPException(status_code=500, detail="Failed to generate a common offer.")
        
        cashback_rules = extract_cashback_rules(common_offer)
        user_data = calculate_cashback(user_data, cashback_rules)
        user_data = suggest_transaction_amounts(user_data, budget=500000)
        save_offer_to_db(common_offer, user_data)
        
        return OfferResponse(offer=common_offer, user_data=user_data.to_dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/fetch-data/")
async def fetch_data():
    try:
        user_data = get_mysql_data()
        return user_data.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
