const Register = require('./Register.js');

// Funcio para crear el nuevo registro 
const createRegister = async(registerData) =>{

    try{
        const newRegister = new Register(registerData);
        await newRegister.save();
        return newRegister;


    }catch(error){
        throw error;
    }
};
// Funcion para obtener todos los registros 
const allRegister = async() => {

    try{
        const register = await Register.find()
        .populate({ path:'createdBy', model: 'User'})
        .populate({path: 'updatedBy', model:'User'});
        
        return register;

    }catch(error){
        throw error;
    }
};

//Funcion para encontrar el registro por ciertos criterios 
const findRegisters = async(criterial) => {
    try{
        const registers = await Register.find(criterial)
        .populate({path: 'createdBy', model:'User'})
        .populate({path: 'updatedBy', model:'User'});

        return registers;

    }catch(error){
        throw error;
    }
};

//Funcion para encontrar un registro por su id 
const findRegistersById = async(registerId) =>{
    try{
        const register = await Register.findById(registerId)
        .populate({path: 'createdBy', model: 'User'})
        .populate({path: 'updatedBy', model: 'User'});

        return register;

    }catch(error){
        throw error;
    }
};

// funcion para actualizar/ editar un registro 
const updateRegister = async(registerId, newData) => {
    try{
        const updatedRegister = await Register.findByIdAndUpdate(registerId, newData, {new: true})
        .populate({path:'createdBy', model:'User'})
        .populate({path:'updatedBy', model:'User'});

        return updatedRegister;
    }catch(error){
        throw error;
    }
};
// Funcion para eliminar el registro 
const deleteRegister = async(registerId) => {
    try{
        await Register.findByIdAndDelete(registerId);
        return {
            msg: 'Register deleted successfully'
        };
    }catch(error){
        throw error;

    }
};
module.exports = {
    createRegister,
    allRegister,
    findRegistersById,
    findRegisters,
    updateRegister,
    deleteRegister
};
