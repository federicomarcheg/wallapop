const upload = require('../config/multer');
const express = require('express');
const { createProduct } = require('../controllers/productController');
const { getProduct } = require('../controllers/productController');
const { getProductsByCategory } = require('../controllers/productController');




router.post('/create', upload.single('image'), createProduct);

router.get('/search',async (req, res) => {
    const { q } = req.query;
    try {
        const products = await Product.find({ title: { $regex: q, $options: 'i'} });
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

const router = express.Router();

router.post('/create', upload.single('image'), createProduct);
router.get('/category/:category', getProductCategory);
router.get('/location', getProductLocation);
router.post('/offer', makeOffer);
module.exports = router;


router.get('/search', async (req, res) => {
    const { query, category, priceRange } = req.query;
    const filter = {};
  
    if (query) filter.title = { $regex: query, $options: 'i' }; // Búsqueda por título
    if (category) filter.category = category; // Filtro por categoría
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      filter.price = { $gte: parseFloat(min), $lte: parseFloat(max) }; // Rango de precios
    }
  
    try {
      const products = await Product.find(filter);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  const express = require('express');
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getAllProduct);

module.exports = router;


import express from 'express';

export default router;
