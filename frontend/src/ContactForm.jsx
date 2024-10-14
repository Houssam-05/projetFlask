import { useState } from "react";
import axios from './axios.jsx'; 
import './ContactForm.css';  
import { Link} from 'react-router-dom'; 

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { first_name: firstName, last_name: lastName, email };

    console.log("Charge utile de la requête :", data);

    try {
      const response = await axios.post("http://localhost:5000/create_contact", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201 || response.status === 200) {
        alert("Contact créé avec succès !");
      }
    } catch (error) {
      alert("Erreur lors de la création du contact : " + error.response.data.message || "Vérifiez votre authentification.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="ContactForm">
      <h2>Create a New Contact</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit" className="btn-create-contact">Create Contact</button>
      <p>vous voulez retournez vers la page de  la liste de contacts  <Link to="/ContactList">Contact List</Link></p>
    </form>
  );
};

export default ContactForm;

