const express = require('express');
const Favorite = require('../models/Favorite');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newFavorite = new Favorite(req.body);
    const savedFavorite = await newFavorite.save();
    res.status(201).json(savedFavorite);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId }).populate('productId');
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:favoriteId', async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.favoriteId);
    res.status(200).json({ message: 'Favorito eliminado' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


router.delete('/', removeFavorite);

const verifyToken = require('../middleware/authMiddleware');
router.post('/', verifyToken, addFavorite);
router.get('/:userId', verifyToken, getFavorites);
router.delete('/', verifyToken, removeFavorite);
