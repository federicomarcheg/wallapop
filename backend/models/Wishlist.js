const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);