const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    buyerId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Offer', offerSchema);