import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:27017/api/users/login', formData);
        login(res.data.token, res.data.user);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="correo" onChange={handleChange} />
            <input name="password" type="password" placeholder="contraseña" onChange={handleChange} />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}

export default LoginPage;