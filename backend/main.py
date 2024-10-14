from config import app, jwt  
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from auth import auth
from models import Contact  
from config import db


app.register_blueprint(auth, url_prefix="/auth")

# Routes
@app.route("/contacts", methods=["GET"])
@jwt_required()
def get_contacts():
    contacts = Contact.query.all() 
    json_contacts = [contact.to_json() for contact in contacts]  
    return jsonify({"contacts": json_contacts})

@app.route("/create_contact", methods=["POST"])
@jwt_required() 
def create_contact():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return jsonify({"message": "Vous n'avez pas fourni toutes les données nécessaires."}), 400

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Contact créé avec succès."}), 201



@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
@jwt_required() 
def update_contact(user_id):
    contact = Contact.query.get(user_id)  
    if not contact:
        return jsonify({"message": "Le contact n'a pas été trouvé."}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    
    db.session.commit()
    return jsonify({"message": "Mise à jour réussie."})

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
@jwt_required() 
def delete_contact(user_id):
    contact = Contact.query.get(user_id)  
    if not contact:
        return jsonify({"message": "Le contact n'a pas été trouvé."}), 404

    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "Le contact a été supprimé avec succès."})

if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
