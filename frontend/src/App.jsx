import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Registre.jsx';
import Login from './Login.jsx';
import ContactList from './ContactsList.jsx';
import ContactForm from './ContactForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<Login />}/>
                <Route path="/Register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ContactList" element={<PrivateRoute><ContactList /></PrivateRoute>} />
                <Route path="/ContactForm" element={<PrivateRoute><ContactForm/></PrivateRoute>} />
                
            </Routes>
        </Router>
    );
}

export default App;
