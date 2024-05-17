from fastapi import FastAPI, HTTPException, status,Depends,WebSocket
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker,Session
from fastapi.responses import FileResponse


app = FastAPI()
 
Base = declarative_base()
# Configure CORS settings
origins = [
    "http://127.0.0.1:8000/login",
    "http://localhost:3000",  # Example frontend URL
    # Add more allowed origins as needed
]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
 
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
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:admin@123@localhost/creditcard_campaign"
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
    if user is None or user.password != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful"}

@app.get("/")
async def home():
    # Render the HTML file
    with open(r"C:\Users\AT597VF\OneDrive - EY\Documents\Python Scripts\Credit card camp\src\LoginPage.js") as f:
        return FileResponse(content=f.read(), status_code=200)