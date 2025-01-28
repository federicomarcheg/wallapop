const express = require('express');
const { createWishlist, addItemToWishlist } = require('../controllers/wishlistController');
const router = express.Router();


router.post('/', createWishlist);
router.put('/add-item', addItemToWishlist);

module.exports = router;