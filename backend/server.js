const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

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

const PORT = process.env.PORT || 27017;
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

