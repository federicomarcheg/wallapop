const express = require('express');
const { rateProduct } = require('../controllers/ratingController');
const router = express.Router();

router.post('/', rateProduct);

module.exports = router;