import mysql.connector
 
try:
    connection = mysql.connector.connect(
        host='localhost',
        user='test',
        password='test*123',
        database='creditcard_campaign'
    )
 
    if connection.is_connected():
        print('Connected to MySQL server')
 
        
        cursor = connection.cursor()
        cursor.execute('SELECT VERSION()')
        version = cursor.fetchone()
        print('MySQL version:', version[0])
 
except mysql.connector.Error as e:
    print('Error connecting to MySQL:', e)
 
finally:
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print('Connection closed')