import React, { useState } from 'react';
import axios from 'axios';



function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);


    const handleSearch = async () => {
        const res = await axios.get(`http://localhost:8080/api/products/search?q=${query}`);
        setResults(res.data);
    };



    return (
        <div>
            <input type="text" placeholder="Buscar productos" onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Buscar</button>
            <ul>
                {results.map((product) => (
                    <li key={product._id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;