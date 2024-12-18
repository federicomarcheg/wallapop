const mongoose = require("mongoose");

const { Schema } = mongoose;


const AdSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [100, "El título no puede exceder los 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
  },
  {
    timestamps: true, // Agrega automáticamente las propiedades createdAt y updatedAt
  }
);

// Definición del modelo
const Ad = mongoose.model("Ad", AdSchema);

module.exports = Ad;
