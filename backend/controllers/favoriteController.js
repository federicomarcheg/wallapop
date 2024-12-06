exports.removeFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await Favorite.finOneAndDelete({ userId, productId });
        res.status(200).json({ message: 'Producto eliminado de favoritos' });
    } catch (error) {
        res.status(500).json(error);
    }
};


