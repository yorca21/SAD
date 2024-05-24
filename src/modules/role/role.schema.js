const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: String,
        required: true
    }]
}, { timestamps: true }); //permite agregar marcas de timpo 
const Role = mongoose.model('Role', roleSchema);
module.exports = Role