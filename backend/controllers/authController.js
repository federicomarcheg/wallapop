const asyncHandler = require("../utils/asyncHandler");
const adService = require("../services/adService");
const CustomError = require("../utils/CustomError");
const AdService = require("../services/adService");
const { resolve } = require("node:dns");

class AdController {
  // Obtener todos los anuncios
  getAllAds = asyncHandler(async (req, res) => {
    const ads = await adService.getAllAds();
    res.status(200).json({ success: true, data: ads });
  });

  // Crear un nuevo anuncio
  createAd = asyncHandler(async (req, res) => {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      throw new CustomError("Faltan campos requeridos", 400);
    }
    const newAd = await adService.createAd({ title, description, price });
    res.status(201).json({ success: true, data: newAd });
  });

  // Obtener un anuncio por ID
  getAdById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ad = await adService.getAdById(id);
    if (!ad) {
      throw new CustomError("Anuncio no encontrado", 404);
    }
    res.status(200).json({ success: true, data: ad });
  });


  // Actualizar un anuncio
  updateAd = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedAd = await adService.updateAd(id, updateData);
    if (!updatedAd) throw new CustomError("Anuncio no encontrado", 404);
    res.status(200).json({ success: true, message: "Anuncio actualizado" });
  });
}

module.exports = new AdController();


const ad = await AdService.createAd({
  title,
  description,
  price,
  category,
  user: req.user.id,
});

response.status(201).json({ success: true, data: ad });

getAds: asyncHandler(async (req, res) => {
  const ads = await AdService.find(req.query).populate('user', 'username email');
  res.status(200).json({ success: true, data: ads });
});


