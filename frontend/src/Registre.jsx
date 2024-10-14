import { useState } from "react";
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Réinitialise le message d'erreur avant chaque tentative
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                password,
            });
            
            // Si le backend retourne un access_token après l'inscription
            const { access_token } = response.data;
            if (access_token) {
                localStorage.setItem('access_token', access_token);
                alert('Inscription réussie. Vous êtes maintenant connecté.');
                // Redirigez l'utilisateur vers la page de son choix, par exemple :
                window.location.href = '/ContactList'; // Remplacez '/dashboard' par votre route
            } else {
                alert('Inscription réussie. Veuillez vous connecter.');
                window.location.href = '/login'; // Redirige vers la page de connexion
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription', error);
            setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');

            // Affichez les erreurs spécifiques du backend si elles sont disponibles
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || 'Erreur inconnue.');
            }
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sinscrire</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <a href="/login">Déjà un compte ? Connectez-vous</a>
        </div>
    );
}

export default Register;
