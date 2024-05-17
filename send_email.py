import mysql.connector
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import JSONResponse

app = FastAPI()

# Database connection parameters
db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'admin@123',
    'database': 'creditcard_campaign'
}

# Email server configuration (example with Gmail)
smtp_server = 'smtp.gmail.com'
smtp_port = 587

@app.post("/send-emails/")
def send_emails(user_id: str = Form(...), password: str = Form(...)):
    try:
        # Connect to the database
        db = mysql.connector.connect(**db_config)
        cursor = db.cursor()

        # SQL Query to fetch receivers' email addresses
        query_receivers = "SELECT emailid FROM receiver_mail;"  # Adjust table and column names as necessary
        cursor.execute(query_receivers)
        receivers = cursor.fetchall()

        if not receivers:
            return {"message": "No receivers found."}

        # Initialize SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Enable security
        server.login(user_id,password)  # Log in to the SMTP server with sender credentials

        # Loop over fetched rows of receivers
        for receiver in receivers:
            receiver_email = receiver[0]

            # Prepare email content
            msg = MIMEMultipart()
            msg['From'] = user_id
            msg['To'] = receiver_email
            msg['Subject'] = 'Hello from Python'
            message = 'Hi from Python'
            msg.attach(MIMEText(message, 'plain'))

            # Send email
            server.sendmail(user_id, receiver_email, msg.as_string())
            print(f"Email sent to {receiver_email} from {user_id}")

        # Cleanup resources
        server.quit()
        cursor.close()
        db.close()

        return {"message": "Emails sent successfully to all receivers."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

