const RegisterQueries = require('./register.queries');


// Controlador para crear un nuevo registro
const createRegister = async (req, res) => {
    try {
        const registerData = req.body;
        const newRegister = await RegisterQueries.createRegister(registerData);
        return  res.status(201).json(newRegister);
    } catch (error) {
       return res.status(500).json({
         msg: 'Error creating register', error 
        });
    }
};

// Controlador para obtener todos los registros
const getAllRegisters = async (req, res) => {
    try {
        if(!req.register){
            return res.status(401).json({
                msg:'Unauthorized register'
            });
        }
        const registers = await RegisterQueries.allRegister(req.body);
         return res.status(200).json(registers);
    } catch (error) {
       return res.status(500).json({ 
            msg: 'Error fetching registers', error 
        });
    }
};

// Controlador para buscar registros por ciertos criterios
const findRegisters = async (req, res) => {
    try {
        const criteria = req.body; 
        const registers = await RegisterQueries.findRegisters(criteria);
       return res.status(200).json(registers);
    } catch (error) {
       return res.status(500).json({ 
            msg: 'Error searching registers', error 
        });
    };
};

// Controlador para obtener un registro por su ID
const getRegisterById = async (req, res) => {
    try {
        const registerId = req.params.id;
        const register = await RegisterQueries.findRegistersById(registerId);
        if (!register) {
            return res.status(404).json({ 
                msg: 'Register not found' 
            });
        }
        return res.status(200).json(register);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error fetching register', error
        });
    }
};

// Controlador para actualizar un registro
const updateRegister = async (req, res) => {
    try {
        const registerId = req.params.id;
        const newData = req.body;
        const updatedRegister = await RegisterQueries.updateRegister(registerId, newData);
        if (!updatedRegister) {
            return res.status(404).json({ 
                msg: 'Register not found' 
            });
        }
        return res.status(200).json(updatedRegister);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error updating register', error 
        });
    }
};

// Controlador para eliminar un registro
const deleteRegister = async (req, res) => {
    try {
        const registerId = req.params.id;
        const result = await RegisterQueries.deleteRegister(registerId);
        
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error deleting register', error 
        });
    }
};

module.exports = {
    createRegister,
    getAllRegisters,
    findRegisters,
    getRegisterById,
    updateRegister,
    deleteRegister
};