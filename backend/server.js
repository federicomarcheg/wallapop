const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
require('.config/passport.js');


const authRoutes = require('./routes/auth');



dotenv.config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopoLogy: true })
.then(() => console.log('conectado a mongoDB'))
.catch((err) => console.error(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

router.post('/checkout', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json(err);
    }
});


const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);




const favoriteRoutes = require('./routes/favoriteRoutes');
app.use('/api/favorites', favoriteRoutes);


const productRoutes = require('./routes/productRoutes');


app.use('/api/products', productRoutes);


const { port } = require('./config/config');


dotenv.config();


connectDB();




app.use(cors());
app.use(express.json());



const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); 

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

const Database = require('./config/database');
Database.connect();


import productRoutes from './routes/productRoutes';
app.use('/api/products', productRoutes);

const logger = require('./config/logger');

app.listen(8080, () => {
    logger.info('Server running on port 8080');
});


import express from "express";
import dotenv from "dotenv";
import adRoutes from "./routes/adRoutes";
import { Server } from 'socket.io';
import {__dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler';
import andlebars from 'express-andlebars';
import viewsRouter from './routes/viewsRouter';




dotenv.config();

app.use(express.json());
app.use("/api/ads", adRoutes);
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);`
`



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || "Error interno del servidor"; 
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  });
  


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const CustomError = require("../utils/CustomError");

const getAdById = async (req, res, next) => {
  try {
    const ad = await AdService.getAdById(req.params.id);
    if (!ad) {
      throw new CustomError("Anuncio no encontrado", 404);
    }
    res.status(200).json({ success: true, data: ad });
  } catch (error) {
    next(error);
  }
};

const asyncHandler = require("../utils/asyncHandler");

const getAllAds = asyncHandler(async (req, res) => {
  const ads = await AdService.getAllAds();
  res.status(200).json({ success: true, data: ads });
});

module.exports = { getAllAds };


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'views');

app.use('/chat', viewsRouter);

app.use(errorHandler);






const httpServer = app.listen(8080, ()=>{
  console.log('🚀 Server listening on port 8080')
});


const express = require('express');
const errorHandler = require('./middleware/errorMiddleware');





app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);


mongoose.connect('mongodb://localhost:8080/wallapop', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(8080, () => console.log('Servidor corriendo en http://localhost:8080'));

