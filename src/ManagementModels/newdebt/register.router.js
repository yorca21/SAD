const { Router } = require('express');
const router = Router();
const registerController = require('./register.controller');

// Ruta para crear un nuevo registro
router.post('/', registerController.createRegister);

// Ruta para obtener todos los registros
router.get('/', registerController.getAllRegisters);

// Ruta para buscar registros por criterios específicos
router.post('/search', registerController.findRegisters);

// Ruta para obtener un registro por su ID
router.get('/:id', registerController.getRegisterById);

// Ruta para actualizar un registro por su ID
router.put('/:id', registerController.updateRegister);

// Ruta para eliminar un registro por su ID
router.delete('/:id', registerController.deleteRegister);

module.exports = router;