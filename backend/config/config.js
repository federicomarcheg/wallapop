const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;


module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'clave-secreta-default',
    jwtExpire: '1d',
    port: process.env.PORT || 5000,
  };
  