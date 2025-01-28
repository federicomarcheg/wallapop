import { useState, useEffect } from 'react';


const WishlistManager = ({ userId }) => {
    const [wishlists, setWishlists] = useState([]);
    const [newWishlistName, setNewWishlistName] = useState('');


    useEffect(() => {
        const fetchWishlists = async () => {
            const response = await fetch(`/api/wishlists?userId=${userId}`);
            const data = await response.json();
            setWishlists(data);
        };
        fetchWishlists();
    }, [userId]);


    const createWishlist = async () => {
        const response = await fetch('/api/wishlists', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userId, name: newWishlistName }),
        });
        const data = await response.json();
        setWishlists([...wishlists, data]);
        setNewWishlistName('');
    };

    return (
        <div>
            <input 
            type="text"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            placeholder="Nueva lista de productos deseados"
            ></input>
            <button onClick={createWishlist}>Crear</button>

            <ul>
            {wishlists.map((wishlist) => (
          <li key={wishlist._id}>{wishlist.name}</li>
        ))}
            </ul>
        </div>
    );
};



export default WishlistManager;