const mongoose = require('mongoose');
const { Schema } = mongoose;

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    decription:{
        type :String,
        require : true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})
const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit