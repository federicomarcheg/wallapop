import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import React, { useState } from 'react';
import FavoritesPage  from './pages/FavoritesPage';
import Header from "./components/Header/Header";
import AdsPage from "./pages/AdsPage";
import ProfilePage from "./pages/ProfilePage";
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { requestNotificationPermission } from './firebase';



function app() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default app;


<Route path="/favorites" element={<FavoritesPage userId="USER_ID" />} />




import CartPage from './pages/CartPage';

<Routes>
  <Route path="/cart" element={<CartPage userId={userId} />} />
</Routes>;


import ProductManagementPage from './pages/ProductManagementPage';

<Routes>
  <Route path="/manage-products" element={<ProductManagementPage />} />
</Routes>;

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:8080/wallapop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api', productRoutes);


app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});






const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

import ProfilePage from "./pages/ProfilePage";

<Route path="/profile" element={<ProfilePage />} />

const optimizedImageUrl = (url, width, height) => `${url}?w=${width}&h=${height}&q=auto`;

<img src={optimizedImageUrl(Imagebuilder, 300, 300)} alt="Producto" />;


const Home = React.lazy(() => import('./pages/Home'));
const ProductDetails = React.lazy(() => import('./pages/ProductsDatails'));
const Cart = React.lazy(() => import('./pages/Cart'));

function app() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </Suspense>
    </Router>
  );
}



useEffect(() => {
  requestNotificationPermission();
}, []);

return <div>Bienvenido a la app</div>;


