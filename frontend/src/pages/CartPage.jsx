import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';


function CartPage({ userId }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCart(res.data.products || []);
    };
    fetchCart();
  }, [userId]);

  const handleRemove = async (productId) => {
    await axios.delete('http://localhost:8080/api/cart', {
      data: { userId, productId },
    });
    setCart(cart.filter((item) => item.productId._id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId._id}>
            {item.productId.title} - {item.quantity} x ${item.productId.price}
            <button onClick={() => handleRemove(item.productId._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
}

export default CartPage;

const fetchCartData = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  const data = await response.json();
  return data;
}
