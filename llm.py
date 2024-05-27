import os
import openai
import pymysql
import re
from pydantic import BaseModel
from langchain.agents import agent_types, create_sql_agent
from langchain_community.utilities import SQLDatabase
from langchain.agents.agent_types import AgentType
from langchain_openai import AzureChatOpenAI
from fastapi import FastAPI, Body, HTTPException
from langchain_community.llms import OpenAI
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from configread import read_config
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.declarative import declarative_base

config_data = read_config()

OPENAI_API_KEY = config_data['OPENAI_API_KEY']
openai_endpoint = config_data['openai_endpoint']
openai_version = config_data['openai_version']
OpenAI_API_Type_local = config_data['OpenAI_API_Type_local']
database = config_data['database']
username = config_data['username']
password = config_data['password']
host = config_data['host']
port = config_data['port']

db_uri = f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"

try:
    db = SQLDatabase.from_uri(db_uri)
except Exception as e:
    print(f"Error connecting to the database: {e}")

try:
    llm = AzureChatOpenAI(
        deployment_name="gpt-4",
        model_name="gpt-4",
        openai_api_key=OPENAI_API_KEY,
        openai_api_type=OpenAI_API_Type_local,
        openai_api_version=openai_version,
        azure_endpoint=openai_endpoint
    )
except Exception as e:
    print(f"Error initializing AzureChatOpenAI: {e}")

try:
    db_agent = create_sql_agent(llm, db=db, agent_type="openai-tools", verbose=True)
except Exception as e:
    response = str(e)
    if response.startswith("Could not parse LLM output: `"):
        response = response.removeprefix("Could not parse LLM output: `").removesuffix("`")
    else:
        print("Not working")

app = FastAPI()

Base = declarative_base()

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

class Prompt(BaseModel):
    prompt: str

class Response(BaseModel):
    responses: list

@app.post("/fetch-data/", response_model=Response)
async def fetch_data(prompt: Prompt):
    responses = []
    for _ in range(3):
        try:
            response = db_agent.run(prompt.prompt)
            responses.append(response)
        except Exception as e:
            print(f"Error executing query: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")
    return {"responses": responses}

def llmresponselog(Query, Response):
    connection = pymysql.connect(
        host=host,
        user=username,
        password=password,
        database=database
    )
    cursor = connection.cursor()
    sql_insert = "INSERT INTO llmtransactions (Query, Response) VALUES (%s, %s)"
    try:
        cursor.execute(sql_insert, (Query, Response))
        connection.commit()
    except pymysql.Error as e:
        print(f"Error inserting data in llmresponselog function: {e}")
        connection.rollback()
    cursor.close()
    connection.close()

def extract_card_cashback(llmresponse):
    pattern = r"Card ID: (\d+),.*?Cashback Amount: ([\d\.]+)"
    extracted_data = []
    if isinstance(llmresponse, str):
        matches = re.findall(pattern, llmresponse, re.MULTILINE)
        for match in matches:
            extracted_data.append({
                "card_id": int(match[0]),
                "cashback_amount": float(match[1])
            })
    return extracted_data

def insert_data(data):
    connection = pymysql.connect(
        host=host,
        user=username,
        password=password,
        database=database
    )
    cursor = connection.cursor()
    sql_insert = "INSERT INTO cardcashback (CardID, CashBackAmount) VALUES (%s, %s)"
    for row in data:
        try:
            cursor.execute(sql_insert, (row["card_id"], row["cashback_amount"]))
            connection.commit()
        except pymysql.Error as e:
            print(f"Error inserting data inside def insert_data function: {e}")
            connection.rollback()
    cursor.close()
    connection.close()

def update_transaction_data(data):
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
        except pymysql.Error as e:
            print(f"Error updating data in update_transaction_data function: {e}")
            connection.rollback()
    cursor.close()
    connection.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
