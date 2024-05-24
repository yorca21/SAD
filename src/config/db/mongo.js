const { default: mongoose } = require('mongoose');

const MONGO_URI = `mongodb://localhost:27017/qwerty`
const initDB = async () => {
    try {

        await mongoose.connect(MONGO_URI, {});
        console.log(`Conectado a MongoDB`);
    } catch (error) {
        console.error('Error al connectar con MongoDB:', error);
        throw error;
    }
}

module.exports = {
    initDB
}


/*const mongoose = require('mongoose');

async function connection_db(gestion_db) {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${gestion_db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa');
  } catch (error) {
    console.error('Error de conexión', error);
  }
}

module.exports = connection_db;*/