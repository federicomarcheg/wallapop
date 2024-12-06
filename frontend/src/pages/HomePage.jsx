import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:27017/api/products');
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Productos Disponibles</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>{product.title} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;


import { Link } from 'react-router-dom';

<Link to={`/chat/${productId}`}>Contactar Vendedor</Link>;


const [ query, setQuery ] = useState('');
const searchProducts = async () => {
    const res = await axios.get(`http://localhost:27017/api/products/search?query=${query}`);
    setProducts(res.data);
};

const (
    <div>
        <input value={query} onChange={ (e) => setQuery(e.target.value)} />
        <button onClick={searchProducts}>Buscar</button>
    </div>
);