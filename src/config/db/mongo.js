const  mongoose = require('mongoose');

const MONGO_URI = `mongodb://localhost:27017/qwerty`
const initDB = async () => {
    try {

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Conectado a MongoDB`);
    } catch (error) {
        console.error('Error al connectar con MongoDB:', error);
        throw error;
    }
}

module.exports = {
    initDB
}

