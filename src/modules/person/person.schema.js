const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    firstName: { 
        type: Schema.Types.String, 
        required: true 
    },
    lastName: { 
        type: Schema.Types.String, 
        required: true 
    },
    CI:{
        type: Schema.Types.Number,
        required: true
    },
    phone: {
        type: Schema.Types.Number,
        required: true

    },
    email: { 
        type: Schema.Types.String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    address: {
        type: Schema.Types.String,
        default:''

    },
    
})

const Person = mongoose.model('Person', personSchema);
module.exports = Person