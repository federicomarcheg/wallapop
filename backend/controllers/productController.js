const Product = require('../models/Product');
const { haversine } = require('../utils/geolocation');
const Offer = require('../models/Offer');



exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err });
  }
};


const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res,json(product);
});

const asyncHandler = require('../utils/asyncHandler');

exports.getProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
})

exports.getProductsByLocation = async (req, res) => {
  const { lat, lon, radius } = req.query;



  try {
    const products = await Product.find();
    const nearbyProducts = products.filter((product) => {
      const [productLat, productLon] = product.location.split(',').map(Number);
      return haversine(lat, lon, productLat, productLon) <= radius;
    });


    res.status(200).json(nearbyProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar productos cercanos' });
  }
};

exports.makeOffer = async (req, res) => {
  try {
    const { productId, buyerId, amount } = req.body;
    const newOffer = await Offer.create({ productId, buyerId, amount });
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ error: 'Error al realizarse la oferta'});
  }
};
