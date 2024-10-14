import  { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactList.css';
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom'; 

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
         
        
        if (!token) {
          throw new Error("Token non disponible pour l'authentification");
        }
  
        const response = await axios.get('http://localhost:5000/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data.contacts);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, []);
  
  
  const handleUpdate = async (contact) => {
    const updatedContact = {
      firstName: prompt('Entrez le nouveau prénom:', contact.firstName),
      lastName: prompt('Entrez le nouveau nom de famille:', contact.lastName),
      email: prompt('Entrez le nouveau courriel:', contact.email),
    };

    if (updatedContact.firstName && updatedContact.lastName && updatedContact.email) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`http://localhost:5000/update_contact/${contact.id}`, updatedContact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts((prevContacts) =>
          prevContacts.map((c) => (c.id === contact.id ? { ...c, ...updatedContact } : c))
        );
        alert('Contact mis à jour avec succès.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du contact :', error.response?.data || error.message);
      }
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/delete_contact/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts((prevContacts) => prevContacts.filter((c) => c.id !== contactId));
        alert('Contact supprimé avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression du contact :', error.response?.data || error.message);
      }
    }
  };
  if (loading) {
    return <p>Loading contacts...</p>;
  }

  return (
    <div className="ContactList">
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
              <button onClick={() => handleUpdate(contact)}>Update</button>
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="contact-add-link">
  Vous voulez ajouter un contact ? <Link to="/ContactForm">Cliquez ici</Link>
</p>
    </div>
    
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
    })
  ),
};

export default ContactList;

