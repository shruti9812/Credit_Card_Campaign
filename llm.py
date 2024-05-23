import os
import openai
import pymysql
import re
from pydantic import BaseModel
from langchain.agents import agent_types ,create_sql_agent
#from langchain.agents.agent_toolkits import SQLDatabaseToolkit
#from langchain.sql_database import SQLDatabase
from langchain_openai import AzureOpenAI
#from langchain.llms.openai import OpenAI
from langchain_community.utilities import SQLDatabase
from langchain.agents.agent_types import AgentType
from langchain_openai import AzureChatOpenAI
from fastapi import FastAPI, Body, HTTPException
from langchain_community.llms import OpenAI
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from configread import read_config

config_data = read_config()

OPENAI_API_KEY=config_data['OPENAI_API_KEY']
openai_endpoint=config_data['openai_endpoint']
openai_version=config_data['openai_version']
OpenAI_API_Type_local=config_data['OpenAI_API_Type_local']
database=config_data['database']
username=config_data['username']
password=config_data['password']
host=config_data['host']
port=config_data['port']


#OPENAI_API_KEY = "4b81012d55fb416c9e398f6149c3071e"
#openai_endpoint="https://ey-sandbox.openai.azure.com"
#openai_version="2023-03-15-preview"
#OpenAI_API_Type_local = "azure"
#database="creditcard_campaign"
#username="root"
#password="mysqlpwd393"
#host="127.0.0.1"
#port='3306'

#global variables start
global userquery, llmresponse
userquery=""
llmresponse=[]
#global variables end

db_uri=f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"

try:
    # Attempt to create SQLDatabase instance
    db = SQLDatabase.from_uri(db_uri)
except Exception as e:
    # Handle connection errors or other exceptions
    print(f"Error connecting to the database: {e}")
    # You may choose to log the error or raise an HTTPException

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


try:
    db_agent= create_sql_agent(llm, db=db, agent_type="openai-tools", verbose=True)
except Exception as e:
    response = str(e)
    if response.startswith("Could not parse LLM output: `"):
        response = response.removeprefix("Could not parse LLM output: `").removesuffix("`")
        #print(response)
    else:
        print("Not working")



app = FastAPI()
   

class Cinfig(BaseModel):
    prompt: str


@app.post("/fetch-data")
async def fetch_data(cinfig:Cinfig):
    """
    Fetches data based on the provided query.

    Args:
        query (str): The user query to be processed.

    Returns:
        str: The response from the db_agent.
    """
    responses = []
    #global userquery, llmresponse
    for _ in range(3):
        try:
            # Attempt to run query with db_agent
            response = db_agent.run(cinfig)
            #print("\n\nTHIS IS THE QUERY GIVEN BY USER : \n\n", query)
            #print("\n\nTHIS IS THE RESPONSE GIVEN BY LLM : \n\n", response)
            userquery = cinfig
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
print("Query is : ", userquery)
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
    sql_insert = "INSERT INTO llmtransactions (Query, Response) VALUES ( %s, %s )"

    try:
        cursor.execute(sql_insert, (userquery, llmresponse))
        connection.commit()
        print(f"Successfully inserted data for query: {Query}")
    except pymysql.Error as e:
        print(f"Error inserting data in llmresponselog function: {e}")
    connection.rollback()  # Rollback on error

    cursor.close()
    connection.close()

print("Before function call of llmresponselog")
#llmresponselog(userquery,llmresponse)
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
        host=host,
        user=username,
        password=password,
        database=database
    )
  print("connection established")
  cursor = connection.cursor()

  # Replace with your table name and column names
  sql_insert = "INSERT INTO cardcashback (CardID, CashBackAmount) VALUES ( %s, %s )"

  for row in data:
    try:
      cursor.execute(sql_insert, (row["card_id"], row["cashback_amount"]))
      connection.commit()
      #print(f"Successfully inserted data for card ID: {row['card_id']}")
    except pymysql.Error as e:
      print(f"Error inserting data inside def insert_data function: {e}")
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
        host=host,
        user=username,
        password=password,
        database=database
    )
    cursor = connection.cursor()

    sql_update = "UPDATE cc_transactions SET Cashback = %s WHERE CardID = %s"

    for row in data:
        try:
            cursor.execute(sql_update, (row["cashback_amount"], row["card_id"]))
            connection.commit()
            print(f"Successfully updated cashback for card ID: {row['card_id']}")
        except pymysql.Error as e:
            print(f"Error updating data in update_transaction_data function: {e}")
            connection.rollback()

    cursor.close()
    connection.close()
