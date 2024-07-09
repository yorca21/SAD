const { Router } = require('express');
const unitController = require('./unit.controller');
const router = Router();

// Ruta para crear una nueva unidad
router.post('/', unitController.createUnit);

//ruta para listar unidades 
router.get('/', unitController.getAllUnits);
// Ruta para encontrar una unidad por su ID
router.get('/:id', unitController.findUnitById);

// Ruta para encontrar unidades por ciertos criterios
router.get('/', unitController.findUnits);

// Ruta para actualizar una unidad 
router.put('/:id', unitController.updateUnit);

// Ruta para eliminar una unidad
router.delete('/:id', unitController.deleteUnit);

module.exports = router;
