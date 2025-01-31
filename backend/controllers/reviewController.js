const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    try {
        const { userId, targetId, text } = req.body;
        const review = await Review.create({ userId, targetId, text });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Error al publicar la reseña' });
    }
};