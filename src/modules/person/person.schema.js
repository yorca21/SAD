const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true

    },
    surname: {
        type: String,
        require: true

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
    direction: {
        type: String,
        default:0,

    },
    
})
const Person = mongoose.model('Person', personSchema);
module.exports = Person