const Ad = require("../models/Ad"); // Modelo de base de datos

class AdService {
  // Obtener todos los anuncios
  static async getAllAds() {
    return await Ad.find();
  }

  // Crear un nuevo anuncio
  static async createAd(data) {
    return await Ad.create(data);
  }

  // Obtener un anuncio por ID
  static async getAdById(id) {
    return await Ad.findById(id);
  }

  // Actualizar un anuncio
  static async updateAd(id, updateData) {
    return await Ad.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Eliminar un anuncio
  static async deleteAd(id) {
    return await Ad.findByIdAndDelete(id);
  }
}

module.exports = AdService;
