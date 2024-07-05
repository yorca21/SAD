const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    decription:{
        type :Schema.Types.String,
        require : true
    },
});
const Role = mongoose.model('Role', roleSchema);
module.exports = Role