import React, { createContext, useState, useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ auth, setAuth] = useState({ token: null, user: null });


    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        if (storedAuth) setAuth(storedAuth);
    }, []);


    const login = (token, user) => {
        setAuth({ token, user });
        localStorage.setItem('auth', JSON.stringify({ token, user }));
    };


    const logout = () => {
        setAuth({ token: null, user: null });
        localStorage.removeItem('auth');
    };


    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};