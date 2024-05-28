const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    CI:{
        type: number,
        require: true
    },
    phone: {
        type: number,
        require: true

    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: {
        type: String,
        default:0,

    },
    
})
const Person = mongoose.model('Person', personSchema);
module.exports = Person