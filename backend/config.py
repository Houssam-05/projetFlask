from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Add this line to disable track modifications
# app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'votre_cle_secrete') 
app.config['BCRYPT_LOG_ROUNDS'] = 12 
app.config['JWT_SECRET_KEY'] = "super-secret" 

app.secret_key = 'super secret key'

db = SQLAlchemy(app)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Ajouter le support CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})