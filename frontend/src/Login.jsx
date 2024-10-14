import { useState } from "react";
import axios from 'axios';
import './Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                new URLSearchParams({
                    username,
                    password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
        

            const token = response.data.access_token;
            console.log(token)
            localStorage.setItem('token', token);
            alert('Connexion réussie');
            window.location.href = '/ContactList'; // Redirige vers la page protégée
        } catch (error) {
            console.error('Erreur de connexion', error);
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    };
    

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Se connecter</button>
            </form>
            <a href="/register">Pas encore inscrit ? Inscrivez-vous</a>
        </div>
    );
}

export default Login;
