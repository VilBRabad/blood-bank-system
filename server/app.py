from flask import json, Flask, request, jsonify, session
import mysql.connector
import os 
from dotenv import load_dotenv
from os.path import join, dirname


app = Flask(__name__)

dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

DB_PASS = os.environ.get("DB_PASS")
DB_NAME = os.environ.get("DB_NAME")

#************** MySQL Connection ****************
conn = mysql.connector.connect( 
    host="localhost",
    user="root",
    password=DB_PASS,
    database=DB_NAME
)
cursor = conn.cursor()

#*************** Doner Resister *****************
@app.route('/donerResister', methods=['POST'])
def donerResister():
    try:
        # data = request.get_json()
        # print(data)
        return jsonify({"message":"Successful", "code":200})

    except Exception as e:
        return jsonify({"message":"Failed {e}", "code":400})



@app.route("/")
def home():
   return "Hello Vila, From flask"

if __name__ == '__main__':
    app.run(debug=True)



