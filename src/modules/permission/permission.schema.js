
const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    }  
});
const Permission =  mongoose.model('Permission', permissionSchema);
module.exports = Permission
