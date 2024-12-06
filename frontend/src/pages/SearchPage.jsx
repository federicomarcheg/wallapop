import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos"
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {results.map((product) => (
          <li key={product._id}>{product.title} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;



