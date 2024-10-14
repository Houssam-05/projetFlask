# from extensions import bcrypt
from config import bcrypt
from flask import Blueprint, request, jsonify, render_template, redirect, url_for, flash
from config import db
from models import User
from flask_jwt_extended import create_access_token

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Tous les champs sont requis."}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Nom d'utilisateur déjà pris."}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Générer un access token pour connecter automatiquement l'utilisateur
    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token), 201
 

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            print(f"Access Token: {access_token}") 
            return jsonify(access_token=access_token), 200  
        
        flash("Nom d'utilisateur ou mot de passe incorrect.")
        return redirect(url_for('auth.login'))

    return render_template('login.html')  
