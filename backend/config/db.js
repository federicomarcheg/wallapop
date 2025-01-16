const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB conectado en: ${conn.connection.host} (${process.env.NODE_ENV})`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); // Detiene el servidor si no puede conectar a la base de datos
  }
};


module.exports = connectDB;


class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
      logger.info('Connected to the database');
    } catch (error) {
      logger.error('Database connection failed', error);
      setTimeout(() => Database.connect(), 5000);
    }
  }
}

module.exports = Database;
