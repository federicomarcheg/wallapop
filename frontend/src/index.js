
import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
    const { name, value, files } = e.target;
    setFormData({...FormData, [name]: files ? files[0] : value});
};

const handleSubmit = async (e) => {
    e.preventDefault();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('image', formData.image);

    await axios.post('http://localhost:8080/api/products/create', data);
};

return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} placeholder="Titulo" />
        <input type="nunber" name="price" onChange={handleChange} placeholder="Precio" />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Crear Producto</button>
    </form>
)


export default CreateProduct;


import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('TU_STRIPE_PUBLIC_KEY');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (error) console.error(error);
    else console.log('Pago exitoso:', paymentIntent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pagar</button>
    </form>
  );
}


import  { AuthProvider } from './context/AuthContext';

<AuthProvider>
  <Router>
    <Routes>
      {/* Rutas */}
    </Routes>
  </Router>
</AuthProvider>;




const handleFavorite = async () => {
  const data = { userId: 'USER_ID', productId: 'PRODUCT_ID' };
  await axios.post('http://localhost:8080/api/favorites', data);
  alert('Producto añadido a favoritos');
};

<button onClick={handleFavorite}>Añadir a Favoritos</button>;


const submitForm = async () => {
  const response = await fetch('/csrf-token');
  const { csrfToken } = await response.json();

  await fetch('/secure-route', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ data: 'test' }),
  });
};


