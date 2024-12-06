import React, { useState } from 'react';
import axios from 'axios';


function CreateProductPage() {
    const [formData, setFormData] = useState({ title: '', price: '', image: null });



    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({...formData, [name]: files ? files[0] : value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('price', formData.price);
        data.append('image', formData.image);
        await axios.post('http://localhost:27017/api/products', data, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        });
        alert('Producto creado con éxito');

    }


    return (
        <form onSubmit={handleSubmit}>
            <input name="title" type="text"  placeholder="Titulo"  onChange={handleChange} />
            <input name="price" type="number" placeholder="Precio" onChange={handleChange} />
            <input name="image" type="file" onChange={handleChange} />
            <button type="submit">Crear Producto</button>
        </form>
    );
}