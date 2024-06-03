const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    cI:{
        type: Number,
        require: true
    },
    phone: {
        type: Number,
        require: true

    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    address: {
        type: String,
        default:''

    },
    
})
const Person = mongoose.model('Person', personSchema);
module.exports = Person