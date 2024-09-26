const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hashPassword, comparePassword } = require('../../helpers/authUtils');

const userSchema = new mongoose.Schema({
    username: { 
        type: Schema.Types.String, 
        required: true,
        unique: true
    },    
    password: { 
        type: Schema.Types.String,
        required: true 
    },
    state:{
        type: Schema.Types.Boolean,
        default:true

    },
    person:{
        type: Schema.Types.ObjectId,
        ref: 'Person',
        require: true

    },
    roles:[{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        require: true
    }],
    permissions:[{
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        require: true
    }],
    unit:{
        type:Schema.Types.ObjectId,
        ref: 'Unit',
        require: true
    },
    // Nuevo campo para el refresh token
    refreshToken: { 
        type: Schema.Types.String,
        default: null
    }
}, { timestamps: true })

// Hook pre-save para cifrar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await comparePassword(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User