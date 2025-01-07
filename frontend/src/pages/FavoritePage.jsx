import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FavoritesPage({ userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await axios.get(`http://localhost:8080/api/favorites/${userId}`);
      setFavorites(res.data);
    };
    fetchFavorites();
  }, [userId]);

  return (
    <div>
      <h1>Mis Favoritos</h1>
      <ul>
        {favorites.map((fav) => (
          <li key={fav._id}>{fav.productId.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;


const handleRemoveFavorite = async (productId) => {
    try {
      await axios.delete('http://localhost:8080/api/favorites', {
        data: { userId, productId },
      });
      setFavorites(favorites.filter((fav) => fav.productId !== productId));
      alert('Producto eliminado de favoritos');
    } catch (err) {
      console.error(err);
    }
  };
  
  <button onClick={() => handleRemoveFavorite(fav.productId)}>
  Eliminar de Favoritos
</button>