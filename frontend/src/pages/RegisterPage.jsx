import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/users/register', formData);
        alert('Usuario registrado con éxito');
    };


    return (
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nombre" onChange={handleChange} />
            <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
            <button type="submit">Registrase</button>
        </form>
    );
}



export default RegisterPage;