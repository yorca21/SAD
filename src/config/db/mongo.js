const  mongoose = require('mongoose');

const MONGO_URI = `mongodb://localhost:27017/SAD`
const initDB = async () => {
    try {

        await mongoose.connect(MONGO_URI, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`connected to the Mongodb`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = {
    initDB
}

