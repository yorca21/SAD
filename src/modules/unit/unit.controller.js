const UnitQueries = require('./unit.queries');

// Controlador para crear una unidad nujeva 
const createUnit = async (req, res) => {
    try {
        const unitData = req.body;
        const newUnit = await UnitQueries.createUnit(unitData);
        res.status(201).json(newUnit);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Unit', error });
    }
};

// Controlador para encontrar una unidad por su ID
const findUnitById = async (req, res) => {
    try {
        const unitId = req.params.id;
        const unit = await UnitQueries.findUnitById(unitId);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ message: 'Error finding unit', error });
    }
};

// Controlador para encontrar unidades por ciertos criterios
const findUnits = async (req, res) => {
    try {
        const criteria = req.query;
        const units = await UnitQueries.findUnits(criteria);
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ message: 'Error finding units', error });
    }
};

// Controlador para actualizar una unidad
const updateUnit = async (req, res) => {
    try {
        const unitId = req.params.id;
        const newData = req.body;
        const updatedUnit = await UnitQueries.updateUnit(unitId, newData);
        if (!updatedUnit) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(updatedUnit);
    } catch (error) {
        res.status(500).json({ message: 'Error updating unit', error });
    }
};

// Controlador para eliminar una unidad
const deleteUnit = async (req, res) => {
    try {
        const unitId = req.params.id;
        const result = await UnitQueries.deleteUnit(unitId);
        if (!result) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json({ message: 'Unit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting unit', error });
    }
};

module.exports = {
    createUnit,
    findUnitById,
    findUnits,
    updateUnit,
    deleteUnit
};
