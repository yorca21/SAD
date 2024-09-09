const mongoose = require('mongoose');
const { Schema } = mongoose;

const unitSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        require: true
    },
    description:{
        type :Schema.Types.String,
        require : true
    },
    
})
const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit