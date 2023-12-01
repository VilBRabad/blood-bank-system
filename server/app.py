from flask import json, Flask, request, jsonify, session
import mysql.connector
import os 
import random
import string
from twilio.rest import Client
from dotenv import load_dotenv
from os.path import join, dirname
from datetime import date


app = Flask(__name__)
app.secret_key = "Vilas"

dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

ACC_SID = os.environ.get("ACC_SID")
AUTH_TOKEN = os.environ.get("AUTH_TOKEN")
TWILIO_NUMBER = os.environ.get("TWILIO_NUMBER")

DB_PASS = os.environ.get("DB_PASS")
DB_NAME = os.environ.get("DB_NAME")

#********************* MySQL Connection ***********************
conn = mysql.connector.connect( 
    host="localhost",
    user="root",
    password=DB_PASS,
    database=DB_NAME
)
cursor = conn.cursor()
 

#***************** Func to Create Random Password *************
def generatePassword():
    password = ''.join(random.choices(string.ascii_letters, k=7))
    return password


#***************** SEND PASSWORD ON MOBILE NO *****************
def sendPasswordToMobile(password, mobile):
    client = Client(ACC_SID, AUTH_TOKEN)
    msg = "Your Password is " + password
    # print(body)
    phone = "+91"+mobile

    print(phone)
    print(msg)
    # sending message to Phone number
    message = client.messages.create(
        from_=TWILIO_NUMBER,
        body=msg,
        to=phone
    )

    print("after send")
    print(message.sid)
    if message.sid:
        return True
    return False


#********************* Doner Resister **************************
@app.route('/donerResister', methods=['POST'])
def donerResister():
    try:
        data = request.get_json()
        fname = data.get("fname")
        mname = data.get("mname")
        lname = data.get("lname")
        mobile = data.get("mobile")
        gender = data.get("gender")
        age = data.get("age")
        blood = data.get("blood")
        address = data.get("address")
        pincode = data.get("pincode")

        address = address+"-"+pincode
        name = fname+" " + mname
        name = name +" "+lname

        password = generatePassword()
        resDate = str(date.today())
        print(resDate)

        #======= Check if already Mobile no. exists or not
        query = "SELECT Name FROM Doner WHERE Contact_info= %s"
        cursor.execute(query, (mobile,))
        phone = cursor.fetchone()
        if phone:
            return jsonify({"message":"Already Resister Mobile No.", "code":403})

        print("pass")
        #======= If password failed to send to mobile number
        # x = sendPasswordToMobile(password, mobile)
        # print(x)
        # if not x:
        #     return jsonify({"message":"Internal Server Error", "code":500})

        #======= adding data in database
        query = "INSERT INTO Doner(Doner_id, Name, Age, Gender, Contact_info, Blood_group, Resi_Date, Address, count, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (mobile, name, age, gender, mobile, blood, resDate, address, "0", password,)
        print("97")
        cursor.execute(query, values)
        print("after")
        conn.commit()

        return jsonify({"message":"Successful", "code":200})
    
    except Exception as e:
        return jsonify({"message":"Failed", "code":400})


#********************* Lab/Hospital Resister **************************
@app.route('/labResister', methods=['POST'])
def labResister():
    try:
        data = request.get_json()
        username = data.get("username")
        name = data.get("name")
        id = data.get("id")
        mobile = data.get("mobile")
        address = data.get("address")
        pincode = data.get("pincode")
        address = address+"-"+pincode

        if len(username) > 10:
            return jsonify({"code":405})

        print(data)
        #======== Finding if Already id is present or not
        print("error1")
        query = "SELECT Name FROM Hospital WHERE Hospital_id= %s"
        cursor.execute(query, (id,))
        Name = cursor.fetchone()

        if Name:
            return jsonify({"message":"Already id Exist.", "code":403})
        
        password = generatePassword()

        #======= If password failed to send to mobile number
        # if not sendPasswordToMobile(password, mobile):
        #     return jsonify({"message":"Internal Server Error", "code":500})
            
        #======= adding data in database.hospital 
        print("error2")
        query = "INSERT INTO Hospital(Hospital_id, Name, Location, Contact_info) VALUES (%s, %s, %s, %s)"
        values = (id, name, address, mobile,)
        cursor.execute(query, values)
        conn.commit()

        print("151")
        # ======== Finding if Already username is present or not
        query = "SELECT Name FROM Admin WHERE Admin_id=%s"
        cursor.execute(query, (username,))
        admin = cursor.fetchone()
        # print(admin)
        if admin:
            return jsonify({"message":"Already id Exist.", "code":403})

        print("Vilas")
        #======= adding data in database.admin
        query2 = "INSERT INTO Admin(Admin_id, Hospital_id, username, password) VALUES(%s, %s, %s, %s)"
        values2 = (username, id, username, password,)
        cursor.execute(query2, values2)
        conn.commit()

        return jsonify({"message":"Successful", "code":200})

    except Exception as e:
        return jsonify({"message":"Failed", "code":400})


# #*********************** Login Handling *********************************
@app.route("/loginHandling", methods=['POST'])
def loginHandling():
    try:
        data = request.get_json()
        # print(data)
        username = data.get("username")
        password = data.get("password")
        Type = data.get("type")

        # print(username)
        # print(password)
        # print(Type)
        # print(data, username, password, Type)
        x = 'x'
        if Type == 'doner':
            print("doner")
            query = "SELECT Name FROM doner WHERE Doner_id=%s AND password=%s"
            values = (username, password, )
            cursor.execute(query, values)
            x=cursor.fetchone()
            conn.commit()
        else:
            print("lab")
            query = "SELECT Name from Admin WHERE Admin_id=%s AND password=%s"
            values = (username, password, )
            cursor.execute(query, values)
            x= cursor.fetchone()
            conn.commit()
        
        # print(x)
        session['username'] = username
        if x:
            return jsonify({"message":"Successful", "code":200})

        return jsonify({"message":"Wrong Credentials", "code":400})
    except Exception as e:
        return jsonify({"message":"Failed", "code":402})


@app.route("/logOut")
def logOutHandle():
    session.pop('username', None)
    return jsonify({"message":"Logout from session", "code":300})


@app.route("/getDonerInfo")
def getData():
    if 'username' in session:
        username = session['username']
        query = "SELECT Name, Contact_info, Resi_Date, Address FROM Doner WHERE Doner_id=%s"
        cursor.execute(query, (username, ))
        data = cursor.fetchone()
        conn.commit()
        # print(data)
        return jsonify({"code": "data found ", "data": data})
    else:
        return jsonify({"message": "Unathourized", "code": 400})


@app.route("/getHospitalAdminInfo")
def getHospData():
    if 'username' in session:
        username = session['username']
        query = "SELECT Admin_id, Name, Contact_info FROM Admin WHERE Admin_id=%s"
        cursor.execute(query, (username, ))
        adminData = cursor.fetchone()

        query2 = "SELECT * FROM Hospital WHERE Hospital_id = (SELECT Hospital_id FROM Admin WHERE Admin_id = %s)"
        cursor.execute(query2, (username, ))
        hospData = cursor.fetchone()
        conn.commit()

        # print(adminData)
        # print(hospData)
        return jsonify({"code": "data found ", "adminData": adminData, "hospData":hospData})
    else:
        return jsonify({"message": "Unathourized", "code": 400})


@app.route("/updateDetails", methods=['POST'])
def updateDeatils():
    try:
        data = request.get_json()
        name = data.get("name")
        mobile = data.get("mobile")

        username = session['username']

        query = "UPDATE Admin SET Name = %s, Contact_info = %s WHERE Admin_id = %s"
        values = (name, mobile, username)
        cursor.execute(query, values)
        
        conn.commit()
        return jsonify({"message":"Updated Successful", "code":200})

    except Exception as e:
        return jsonify({"message":"Failed", "code":402})


@app.route("/fetchData", methods=['POST'])
def fetchData():
    try:
        data = request.get_json()
        mobile = data.get("mobile")

        query = "SELECT Name, Age, Contact_info, Blood_group, Address FROM doner WHERE doner_id = %s"
        cursor.execute(query, (mobile,))
        res = cursor.fetchone()

        if res:
            return jsonify({"message":"Data Found", "code":200, "data":res})
        
        return jsonify({"message":"Not Found", "code":404})
    except Exception as e:
        return jsonify({"message":"Failed", "code":402}) 



@app.route("/pinHandle", methods=['POST'])
def gettingData():
    try:
        data = request.get_json()
        pincode = data.get("pincode")
        # Hospital = 

        query = f"SELECT hospital_id, Name FROM Hospital WHERE Location LIKE '%{pincode}%'"
        print(query)
        cursor.execute(query)
        # print(res)
        dt = cursor.fetchall()
        print(dt)
        if dt:
            return jsonify({"code": 200, "data":dt})
        
        return jsonify({"code": 202, "message":"Error"})
          
    except Exception as e:
        return jsonify({"message":"Failed", "code":402})


@app.route("/postFetchData", methods=['POST'])
def postFetchData():
    try:
        data = request.get_json()
        hospital = data.get("hospital")
        hospital_id =''
        for i in range(6):
            hospital_id += hospital[i]
        
        dt = str(data.get("date"))
        username = session['username']

        print(username, hospital_id, dt)

        query = "INSERT INTO Appointment(Doner_id, Hospital_id, date) VALUES(%s, %s, %s)"
        values = (username, hospital_id, dt)
        cursor.execute(query, values)
        conn.commit()

        return jsonify({"message":"Sucessful", "code":200})
    except Exception as e:
        return jsonify({"message":"Failed", "code":402})

@app.route("/bloodDonation", methods=['POST'])
def bloodDonation():
    try:
        data = request.get_json()
        doner_id = data.get("mobile")
        bloog_group = data.get("blood_group")
        curDate = str(date.today())

        username = session['username']
        query1 = "SELECT Hospital_id FROM Admin WHERE Admin_id=%s"
        cursor.execute(query1, (username,))
        Hospital_id = cursor.fetchone()

        print(type(Hospital_id[0]))

        query = "INSERT INTO Blood_donation(Doner_id, Hospital_id, date, blood_group) VALUES(%s, %s, %s, %s)"
        values = (doner_id, Hospital_id[0], curDate, bloog_group)
        x = cursor.execute(query, values)
        conn.commit()
        print(x)
        print("Line: 359")
        return jsonify({"code":200})

    except Exception as e:
        return jsonify({"message":"Failed", "code":402})


@app.route("/")
def home():
   return "Server Runnig.........."



if __name__ == "__main__":
    app.run(debug=True)



