import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import React, { useState } from 'react';
import FavoritesPage  from './pages/FavoritesPage';


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
