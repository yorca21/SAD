const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    description:{
        type :Schema.Types.String,
        require : true
    },
    permissions:[{
        type: Schema.Types.ObjectId,
        ref: 'Permission'
    }]
});
const Role = mongoose.model('Role', roleSchema);
module.exports = Role