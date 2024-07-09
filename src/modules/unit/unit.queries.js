const Unit = require('./unit.schema');

// Función para crear una nueva unidad 
const createUnit = async (unitData) => {
    try {
        const newUnit = new Unit(unitData);
        await newUnit.save();
        return newUnit;
    } catch (error) {
        throw error;
    }
};
// funcion para listar las unidades 
const allUnits = async() =>{
    try{
        const units = await Unit.find();
        return units; 
    }catch (error) {
        throw error;
    }
}
// Función para encontrar una unidad por ID
const findUnitById = async (unitId) => {
    try {
        const unit = await Unit.findById(unitId).populate('permissions');
        return unit;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar unidades por ciertos criterios
const findUnits = async (criteria) => {
    try {
        const units = await Unit.find(criteria.name).populate('permissions');
        return units;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un rol
const updateUnit = async (unitId, newData) => {
    try {
        const updatedUnit = await Unit.findByIdAndUpdate(unitId, newData, { new: true }).populate({path:'name', model: Permission });
        return updatedUnit;
    } catch (error) {
        throw error;
    }
};
// Función para eliminar una unidad
const deleteUnit = async (unitId) => {
    try {
        await Unit.findByIdAndDelete(unitId);
        return { message: 'Unit deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUnit,
    allUnits,
    findUnitById,
    findUnits,
    updateUnit,
    deleteUnit
};