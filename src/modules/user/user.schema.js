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
        requered: true
    },
    person:[{
        type: Schema.Types.ObjectId,
        ref: 'Person',
        require: true

    }],
    role:[{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        require: true
    }],
    permission :[{
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        require: true

    }],
    unit:[{
        type:Schema.Types.ObjectId,
        ref: 'Unit',
        require: true
    }],
})
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

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await comparePassword(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User