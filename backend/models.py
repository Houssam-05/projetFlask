# import bcrypt
from config import db



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password
    

   

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
        }

class Contact (db.Model):
    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String(80),unique=False,nullable=False)
    last_name=db.Column(db.String(80),unique=False,nullable=False)
    email=db.Column(db.String(80),unique=False,nullable=False)
   
    def to_json(self):
        return {
            "id":self.id,
            "firstName":self.first_name,
            "lastName":self.last_name,
            "email":self.email,
        } 
