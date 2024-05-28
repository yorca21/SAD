const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },    
    password: { 
        type: String, 
        required: true 
    },
    person:[{
        type: Schema.Types.ObjectId,
        ref: 'Person'

    }],
    unit:[{
        type: Schema.Types.ObjectId,
        ref: 'Unit'
    }],
    role:[{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
})
const User = mongoose.model('User', userSchema);
module.exports = User