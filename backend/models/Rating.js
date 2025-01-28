const ratingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    score: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model('Rating', ratingSchema);