import mysql.connector
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from mysql.connector import Error

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
