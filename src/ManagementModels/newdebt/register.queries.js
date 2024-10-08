const Register = require('./Register.js');

// Funcio para crear el nuevo registro 
const createRegister = async(registerData) =>{

    try{
        const newRegister = new Register(registerData);
        await newRegister.save();
        return newRegister;
    }catch(error){
        console.error('Error en createRegister (DB):', error); 
        throw error;
    }
};
// Funcion para obtener todos los registros 
const allRegister = async() => {

    try{
        const register = await Register.find()
        .populate({ path:'createdBy', model: 'User'})
        .populate({ path: 'updatedBy', model:'User'});
        
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
//gestion de deudas en el modelo de deudor 
//funcion para agregar una nueva deuda un un deudor 
const addDebtToRegister = async (registerId, debtData) => {
    try {
        const debtor = await Register.findById(registerId);
        if (!debtor) {
            throw new Error('Deudor no encontrado');
        }
        debtor.debts.push(debtData);  // Añadir la nueva deuda al array de debts
        await debtor.save();  // Guardar el registro con la deuda añadida
        return debtor;
    } catch (error) {
        console.error('Error al agregar deuda:', error);
        throw error;
    }
};
// funcion para eliminar una deuda del modelo deudor 
const removeDebtFromRegister = async (registerId, debtId) => {
    try {
        const debtor = await Register.findById(registerId);
        if (!debtor) {
            throw new Error('Deudor no encontrado');
        }
        debtor.debts = debtor.debts.filter(debt => debt._id.toString() !== debtId);  // Eliminar la deuda por su _id
        await debtor.save();  // Guardar el registro con la deuda eliminada
        return debtor;
    } catch (error) {
        console.error('Error al eliminar deuda:', error);
        throw error;
    }
};

module.exports = {
    createRegister,
    allRegister,
    findRegistersById,
    findRegisters,
    updateRegister,
    deleteRegister,
    addDebtToRegister,
    removeDebtFromRegister
};
