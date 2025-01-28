const wishlist = require('../models/Wishlist');


exports.createWishlist = async (req, res) => {
    try {
        const { userId, name} = req.body;
        const wishlist = await Wishlist.create({ userId, name, items: [] });
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la lista de productos deseados' });
    }
};


exports.addItemToWishlist = async (req, res) => {
    try {
        const { wishlistId, productId } = req.body;
        const wishlist = await Wishlist.findByIdAndUpdate(
            wishlistId,
            { $addToSet: { items: productId } },
            { new: true }
        );
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto a la lista'});
    }
};