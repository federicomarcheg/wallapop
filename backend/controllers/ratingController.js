const Rating = require('../models/Rating');


exports.rateProduct = async (req, res) => {
    try {
        const { userId, productId, score } = req.body;
        const rating = await Rating.findOneAndUpdate(
            { userId, productId },
            { score },
            { upsert: true, new: true },
        );
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: 'Error al calificar el producto' });
    }
};