from flask import json, Flask, request, jsonify, session
import mysql.connector
import os 
from dotenv import load_dotenv
from os.path import join, dirname
from datetime import date


app = Flask(__name__)


dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

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
        # age = int(data.get("age"))
        blood = data.get("blood")
        address = data.get("address")
        pincode = data.get("pincode")
        address = address+"-"+pincode
        name = fname+" " + mname
        name = name +" "+lname
        # print(name)
        # print(type(age))
        resDate = str(date.today())
        # print(type(str(resDate)))
        query = "SELECT Name FROM Doner WHERE Contact_info= %s"
        cursor.execute(query, (mobile,))
        phone = cursor.fetchone()

        print(mobile)
        print(name)
        print(gender)
        print(age)
        print(blood)
        print(address)
        print(pincode)
        if phone:
            return jsonify({"message":"Already Resister Mobile No.", "code":202})

        print("hello")
        query = "INSERT INTO doner(Doner_id, Name, Age, Gender, Contact_info, Blood_group, Resi_Date, Address, count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (mobile, name, age, gender, mobile, blood, resDate, address, "0",)
        x = cursor.execute(query, values)
        print(x)
        conn.commit()
        print(x)
        return jsonify({"message":"Successful", "code":200})
    
    except Exception as e:
        return jsonify({"message":"Failed {e}", "code":400})


#********************* Lab/Hospital Resister **************************
@app.route('/labResister', methods=['POST'])
def labResister():
    return "vilas"


@app.route("/")
def home():
   return "Server Runnig.........."



if __name__ == "__main__":
    app.run(debug=True)



