import mysql.connector
from fastapi import FastAPI,HTTPException,status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from mysql.connector import Error
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker,Session
from fastapi.responses import FileResponse
from fastapi import FastAPI, HTTPException, status,Depends,WebSocket
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
import json

 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specifies the origins that are permitted to make requests.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods.
    allow_headers=["*"],  # Allows all headers.
)
 
DATABASE_CONFIG = {
    'user': 'root',
    'password': 'Admin*123',
    'host': '127.0.0.1',
    'database': 'creditcard_campaign'
}
 
# 1. Create Campaign Details

#  Pydantic model for request body
class UserData(BaseModel):
   
    campaignTitle: str
    campaignBudget: str
    campaignStartDate: str
    campaignEndDate: str
    cardType: str
    transactionType: str
    notEligibleTransactionType: str
    minOverallTransactionAmount: str
    minCashbackAmount: str
    maxCashbackOverall: str
    maxCashbackPerTransaction: str
    frequency: str
    additionalField: str
 
def get_db_connection():
    try:
        connection = mysql.connector.connect(**DATABASE_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
 
@app.post("/store_campaigndetails/")
async def store_campaigndetails(user_data: UserData):
    conn = get_db_connection()
    if conn is None:
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content={"message": "Database connection failed"})
   
    try:
        cursor = conn.cursor()
        query = "INSERT INTO campaign_details (CampaignTitle,CampaignBudget,CampaignStartDate,CampaignEndDate,CardType,TransactionType,NotEligibleTransactionType,MinOverallTransactionAmount,MinCashbackAmount,MaxCashbackOverall,MaxCashbackPerTransaction,Frequency,AdditionalField) VALUES (%s,%s,%s, %s,%s,%s,%s, %s,%s, %s,%s, %s,%s)"
        cursor.execute(query, (user_data.campaignTitle,user_data.campaignBudget,user_data.campaignStartDate,user_data.campaignEndDate,user_data.cardType,user_data.transactionType,user_data.notEligibleTransactionType,user_data.minOverallTransactionAmount,user_data.minCashbackAmount,user_data.maxCashbackOverall,user_data.maxCashbackPerTransaction,user_data.frequency,user_data.additionalField))
        
        conn.commit()
        return {"message": "User data stored successfully!"}
    except Error as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Failed to store user data", "error": str(e)})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.get("/items")
async def read_campaigndetails():
    conn = get_db_connection()
    if conn is None:
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content={"message": "Database connection failed"})
   
    try:
        cursor = conn.cursor()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM campaign_details")
        items = cursor.fetchall()
        cursor.close()
        return items
        
        # return {"message": "User data fetched successfully!"}
    except Error as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Failed to store user data", "error": str(e)})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# 2. Login Module

Base = declarative_base()
# Configure CORS settings
origins = [
    "http://127.0.0.1:8000/login",
    "http://localhost:3000",  # Example frontend URL
    # Add more allowed origins as needed
]

class User(Base):
    __tablename__ = "user"
 
    username = Column(String, primary_key=True)
    password = Column(String)
    email = Column(String)
    employeeid = Column(String)
    position = Column(String)
 
class Credentials(BaseModel):
    username: str
    password: str
 
# Create database engine
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:Admin*123@localhost/creditcard_campaign"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
 
# Create database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
 
# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
 
# Login endpoint


@app.post("/login/")
def login(credentials: Credentials, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == credentials.username).first()
    if user is None or user.password!= credentials.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {
        "message": "Login successful",
        "username": user.username,
        "email": user.email,
        "employeeid": user.employeeid,
        "position": user.position
    }

@app.get("/")
async def home():
    # Render the HTML file
    with open(r"C:\Users\AT597VF\OneDrive - EY\Documents\Python Scripts\Credit card camp\src\LoginPage.js") as f:
        return FileResponse(content=f.read(), status_code=200)
    
# 3. Register a new account

# Pydantic model for request body
class UserData(BaseModel):
    fullName: str # Tanishka modified this
    email: str
    password: str
    employeeId: str
    position: str

def get_db_connection():
    try:
        connection = mysql.connector.connect(**DATABASE_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

@app.post("/store_user/")
async def store_user(user_data: UserData):
    conn = get_db_connection()
    if conn is None:
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content={"message": "Database connection failed"})
    
    try:
        cursor = conn.cursor()
        query = "INSERT INTO user (username, email, password, employeeid, position) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (user_data.fullName, user_data.email, user_data.password, user_data.employeeId, user_data.position)) # Tanishka modified this
        conn.commit()
        return {"message": "User data stored successfully!"}
    except Error as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Failed to store user data", "error": str(e)})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# 4. llm recommendations

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