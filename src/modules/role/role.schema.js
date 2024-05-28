const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission'
    }]
}, { timestamps: true }); //permite agregar marcas de timpo 
const Role = mongoose.model('Role', roleSchema);
module.exports = Role