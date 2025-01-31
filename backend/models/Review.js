const reviewSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    targetId: mongoose.Schema.Types.ObjectId,
    text: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);