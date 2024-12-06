const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

     createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Favorite', FavoriteSchema);