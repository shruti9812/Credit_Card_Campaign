import os
import openai
import pymysql
import re
from langchain.agents import agent_types ,create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain_openai import AzureOpenAI
from langchain.llms.openai import OpenAI
from langchain_community.utilities import SQLDatabase
# from langchain.chat_models import ChatOpenAI
# import AgentExecutor
from langchain.agents.agent_types import AgentType
from langchain_openai import AzureChatOpenAI
from fastapi import FastAPI, Body, HTTPException

OPENAI_API_KEY = "4b81012d55fb416c9e398f6149c3071e"
openai_endpoint="https://ey-sandbox.openai.azure.com"
openai_version="2023-03-15-preview"
OpenAI_API_Type_local = "azure"
global userquery, llmresponse

database="creditcard_campaign"
username="root"
password="Admin*123"
#database="creditcard"
#username="root"
#password="Admin*123"
host="127.0.0.1"
port='3306'
#host="IN3329350W1"
userquery=""
llmresponse=[]

 
#db_uri=f"mysql+mysqlconnector://{database}"
#db_uri=f"mysql+pymysql://root:Admin*123@localhost:3306/creditcard"
db_uri=f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"
#print(db_uri)
#db_uri=f"mysql+mysqlconnector://{username}:{password}@{host}:{port}/{database}"

try:
    # Attempt to create SQLDatabase instance
    db = SQLDatabase.from_uri(db_uri)
except Exception as e:
    # Handle connection errors or other exceptions
    print(f"Error connecting to the database: {e}")
    # You may choose to log the error or raise an HTTPException
#llm = OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, tiktoken_model_name='gpt-35-turbo')

#llm = OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, tiktoken_model_name='gpt-35-turbo')

# llm=AzureOpenAI(
#     api_key=OPENAI_API_KEY,  
#     api_version=openai_version,
#     azure_endpoint = openai_endpoint
#     )

# print(llm.invoke(llm))
try:
    # Attempt to create AzureChatOpenAI instance
    llm = AzureChatOpenAI(
        deployment_name="gpt-4",
        model_name="gpt-4",
        openai_api_key=OPENAI_API_KEY,
        openai_api_type=OpenAI_API_Type_local,
        openai_api_version=openai_version,
        azure_endpoint=openai_endpoint
    )
except Exception as e:
    # Handle initialization errors or other exceptions
    print(f"Error initializing AzureChatOpenAI: {e}")
    # You may choose to log the error or raise an HTTPException
'''
#toolkit = SQLDatabaseToolkit(db=db,llm=OpenAI(api_key=OPENAI_API_KEY,temperature=0))
toolkit = SQLDatabaseToolkit(db=db,llm=AzureChatOpenAI(
    deployment_name="gpt-4",
    model_name="gpt-4",
    openai_api_key=OPENAI_API_KEY,
    openai_api_type=OpenAI_API_Type_local,
    openai_api_version=openai_version,
    azure_endpoint=openai_endpoint,
    temperature=0
))
'''
'''
llm = AzureChatOpenAI(
    deployment_name="gpt-4",
    model_name="gpt-4",
    openai_api_key=OPENAI_API_KEY,
    openai_api_type=OpenAI_API_Type_local,
    openai_api_version=openai_version,
    azure_endpoint=openai_endpoint,
    temperature=0
)
'''
# Assuming 'toolkit' is already defined

# db_agent = create_sql_agent(llm=AzureChatOpenAI(
#     deployment_name="gpt-4",
#     model_name="gpt-4",
#     openai_api_key=OPENAI_API_KEY,p
#     openai_api_type=OpenAI_API_Type_local,
#     openai_api_version=openai_version,
#     azure_endpoint=openai_endpoint,
#     temperature=0
# ),
#     toolkit=toolkit,
#     verbose=True,
#     agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
# )
'''
try:
    # Attempt to create SQL agent
    db_agent= create_sql_agent(llm, db=db, agent_type="openai-tools", verbose=True)
except Exception as e:
    # Handle creation errors or other exceptions
    print(f"Error creating SQL agent: {e}")
    # You may choose to log the error or raise an HTTPException
    '''
#print(db_agent.invoke("hello"))
#response= db_agent.run("Get All cardid data and suggest me ways to divide 500000 rupee in between all Cardid basis on transation amount, whose transaction is high can get max 1000rupee and whos transation amount is lesss can get minimum 5 rupee and show me the list of cardid with amount")
#response= db_agent.run("our bank as sanctioned 10000 the sum amount for all the customers together to provide the cashback to all the cardid which are all active, we need to provide the cashback to all the customers who done the transactions.minimum cashback is 2 percent and the maximum cashback is 10 percent, who spend below 5000 shoulld have 10 percent cashback and who spend morethan 5000 should have 2 percent caskback is a kind of example.all the cashback amount should not exceed the sanctioned an=mount of 10000 by bank. the output should be cardid,recent spend,cashback percentage, cashback amount")
#print(response)

#db_agent.run("Fetch all Table count from Creditcard database")
try:
    #response= db_agent.run("SELECT TransactionAmount FROM creditcard.cc_transactions;")
    #response= db_agent.run("SELECT CustomerName FROM creditcard_campaign.cc_status;")    
    db_agent= create_sql_agent(llm, db=db, agent_type="openai-tools", verbose=True)
except Exception as e:
    response = str(e)
    if response.startswith("Could not parse LLM output: `"):
        response = response.removeprefix("Could not parse LLM output: `").removesuffix("`")
        #print(response)
    else:
        print("Not working")

app = FastAPI()

@app.post("/fetch-data")
async def fetch_data(query: str = Body(...)):
    """
    Fetches data based on the provided query.

    Args:
        query (str): The user query to be processed.

    Returns:
        str: The response from the db_agent.
    """
    '''
    try:
        # Attempt to run query with db_agent
        response = db_agent.run(query)
        return response
    except Exception as e:
        # Handle query execution errors or other exceptions
        print(f"Error executing query: {e}")
        # You may choose to log the error or raise an HTTPException
        raise HTTPException(status_code=500, detail="Internal server error")'''
    responses = []
    global userquery, llmresponse
    for _ in range(3):
        try:
            # Attempt to run query with db_agent
            response = db_agent.run(query)
            #print("\n\nTHIS IS THE QUERY GIVEN BY USER : \n\n", query)
            #print("\n\nTHIS IS THE RESPONSE GIVEN BY LLM : \n\n", response)
            userquery = query
            llmresponse=response
            responses.append(response)
        except Exception as e:
            print(f"Error executing query: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")
    print("QUery is : ", userquery)
    print("Response is : ", llmresponse)
    llmresponselog(userquery,llmresponse)
    ##
    extracted_data = extract_card_cashback(llmresponse)
    print("\n\n The extracted data is : \n\n",extracted_data)
    insert_data(extracted_data)
    update_transaction_data(extracted_data)
    ##
    return responses
print("\n\nAFTER FUNCTION RETURN\n\n")
print("QUery is : ", userquery)
print("Response is : ", llmresponse)
    #LLM Response log Start

def llmresponselog(Query,Response):
  
    print("inside llm response logging function")
  # Replace with your database connection details
    connection = pymysql.connect(
        host=host,
        user=username,
        password=password,
        database=database
         )
    print("connection established")
    cursor = connection.cursor()

  # Replace with your table name and column names
    sql_insert = "INSERT INTO llmtransactions (Query, Response) VALUES (%s, %s)"

    try:
        cursor.execute(sql_insert, (Query, Response))
        connection.commit()
        print(f"Successfully inserted data for query: {Query}")
    except pymysql.Error as e:
        print(f"Error inserting data: {e}")
    connection.rollback()  # Rollback on error

    cursor.close()
    connection.close()

print("Before function call of llmresponselog")
llmresponselog(userquery,llmresponse)
print("After function call of llmresponselog")
#LLM Response log End

def extract_card_cashback(llmresponse):
  """
  Extracts card IDs and cashback amounts from the LLM response.

  Args:
      llm_response: The LLM's response as a string.

  Returns:
      A list of dictionaries, where each dictionary has keys 'card_id' and 'cashback_amount'
      if found, otherwise an empty list.
  """

  #pattern = r"(Card ID: (\d+))|(CardID: (\d+)),\s*(Cashback Amount: ([\d\.]+))|(CashbackAmount: ([\d\.]+))"  # Regex pattern for this specific format
  pattern = r"Card ID: (\d+),.*?Cashback Amount: ([\d\.]+)"  # Regex pattern for this specific format
  #pattern = r"(?:Card ID|Card id|cardID|card id|CARD ID|CardID): (\d+).*?(?:Cashback Amount|Cashback amount|cashbackamount|CASHBACK AMOUNT|CashbackAmount): ([\d\.]+)"
  extracted_data = []
  #matches = re.findall(pattern, llmresponse, re.MULTILINE)
  if type(llmresponse) == str:
    print("IS STRING : ",llmresponse)
    matches = re.findall(pattern, llmresponse, re.MULTILINE)
  else:
    print("Error: llmresponse is not a string.")
  for match in matches:
    extracted_data.append({
        "card_id": int(match[0]),
        "cashback_amount": float(match[1])
    })
    print(extracted_data)

  return extracted_data

def insert_data(data):
  """
  Inserts extracted data (card ID and cashback amount) into the database.

  Args:
      data: A list of dictionaries containing extracted card ID and cashback amount.
  """
  print("inside insert data function")
  # Replace with your database connection details
  connection = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="Admin*123",
        database="creditcard_campaign"
    )
  print("connection established")
  cursor = connection.cursor()

  # Replace with your table name and column names
  sql_insert = "INSERT INTO cardcashback (CardID, CashBackAmount) VALUES (%s, %s)"

  for row in data:
    try:
      cursor.execute(sql_insert, (row["card_id"], row["cashback_amount"]))
      connection.commit()
      #print(f"Successfully inserted data for card ID: {row['card_id']}")
    except pymysql.Error as e:
      print(f"Error inserting data: {e}")
      connection.rollback()  # Rollback on error

  cursor.close()
  connection.close()
  print("Executed insert_data function")

def update_transaction_data(data):
    """
    Updates the 'transactions' table with cashback amount based on extracted card ID.

    Args:
        data: A list of dictionaries containing extracted card ID and cashback amount.
    """

    connection = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="Admin*123",
        database="creditcard_campaign"
    )
    cursor = connection.cursor()

    sql_update = "UPDATE cc_transactions SET Cashback = %s WHERE CardID = %s"

    for row in data:
        try:
            cursor.execute(sql_update, (row["cashback_amount"], row["card_id"]))
            connection.commit()
            print(f"Successfully updated cashback for card ID: {row['card_id']}")
        except pymysql.Error as e:
            print(f"Error updating data: {e}")
            connection.rollback()

    cursor.close()
    connection.close()

# Example usage
#llmresponse = "Here are the cashback amounts for 10 customers who are not spending a very low amount:\n\n1. CardID: 1144673, CustomerNumber: 114456290, LastSpending: 381230, CashbackAmount: 38123\n2. CardID: 1144674, CustomerNumber: 291208651, LastSpending: 38602, CashbackAmount: 3860.2\n3. CardID: 1144675, CustomerNumber: 188789012, LastSpending: 50089, CashbackAmount: 5008.9\n4. CardID: 1144676, CustomerNumber: 371732908, LastSpending: 337937, CashbackAmount: 33793.7\n5. CardID: 1144677, CustomerNumber: 816765120, LastSpending: 162385, CashbackAmount: 16238.5\n6. CardID: 1144678, CustomerNumber: 108899054, LastSpending: 82792, CashbackAmount: 8279.2\n7. CardID: 1144679, CustomerNumber: 133000547, LastSpending: 23792, CashbackAmount: 2379.2\n8. CardID: 1144680, CustomerNumber: 538427541, LastSpending: 9918, CashbackAmount: 991.8\n9. CardID: 1144681, CustomerNumber: 135060876, LastSpending: 99079, CashbackAmount: 9907.9\n10. CardID: 1144682, CustomerNumber: 144187432, LastSpending: 50167, CashbackAmount: 5016.7\n\nThese cashback amounts are based on 10% of their last spending transaction."  # Your LLM response

#extracted_data = extract_card_cashback(llmresponse)
#print("\n\n The extracted data is : \n\n",extracted_data)
#insert_data(extracted_data)
