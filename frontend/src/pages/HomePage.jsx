import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:8080/api/products');
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
    const res = await axios.get(`http://localhost:8080/api/products/search?query=${query}`);
    setProducts(res.data);
};

const searchBar = (
    <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={searchProducts}>Buscar</button>
    </div>
);

import React, { useState, useEffect } from "react";
import AdList from "../components/AdCard/AdList";

const HomePage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    
    const fetchAds = async () => {
      const response = await fetch("/api/ads");
      const data = await response.json();
      setAds(data.ads);
    };

    fetchAds();
  }, []);

  const handleViewDetails = (id) => {
    console.log("Ver detalles del anuncio con ID:", id);
    
  };

  const handleAddToFavorites = (id) => {
    console.log("Agregar a favoritos el anuncio con ID:", id);
    
  };

  return (
    <div>
      <h1>Lista de Anuncios</h1>
      <AdList ads={ads} onViewDetails={handleViewDetails} onAddToFavorites={handleAddToFavorites} />
    </div>
  );
};


