import mysql.connector
from fastapi import FastAPI,HTTPException,status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from mysql.connector import Error
from fastapi.middleware.cors import CORSMiddleware
 
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
    'password': 'admin@123',
    'host': '127.0.0.1',
    'database': 'creditcard_campaign'
}
 
 
# Pydantic model for request body
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
        query = "INSERT INTO campaign_details (CampaignTitle,CampaignBudget,CampaignStartDate,CampaignEndDate,CardType,TransactionType,NotEligibleTransactionType,MinOverallTransactionAmount,MinCashbackAmount,MaxCashbackOverall,MaxCashbackPerTransaction,Frequency,AdditionalField) VALUES (%s, %s,%s, %s,%s,%s,%s, %s,%s, %s,%s, %s,%s)"
        cursor.execute(query, (user_data.campaignTitle,user_data.campaignBudget,user_data.campaignStartDate,user_data.campaignEndDate,user_data.cardType,user_data.transactionType,user_data.notEligibleTransactionType,user_data.minOverallTransactionAmount,user_data.minCashbackAmount,user_data.maxCashbackOverall,user_data.maxCashbackPerTransaction,user_data.frequency,user_data.additionalField))
        
        conn.commit()
        return {"message": "User data stored successfully!"}
    except Error as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Failed to store user data", "error": str(e)})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.get("/")
async def read_campaigndetails():
    conn = get_db_connection()
    if conn is None:
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content={"message": "Database connection failed"})
   
    try:
        cursor = conn.cursor()
        query = "select * from campaign_details"
        cursor.execute(query)
        result=cursor.fetchall()
        
        return {"message": "User data fetched successfully!"}
    except Error as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Failed to store user data", "error": str(e)})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)