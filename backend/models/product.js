const mongoose = require('mongoose');
const Product = require('../models/product');


const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});



exports.getProductsByCategory = async ( req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos por categoria' });
    }
};



module.exports = mongoose.model('Product', ProductSchema);
