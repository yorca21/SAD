const { Router } = require('express');
const router = Router();
const registerController = require('./register.controller');
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');

// Ruta para crear un nuevo registro
router.post('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.createRegister);

// Ruta para obtener todos los registros
router.get('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.getAllRegisters);

// Ruta para buscar registros por criterios específicos
router.post('/search',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.findRegisters);

// Ruta para obtener un registro por su ID
router.get('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.getRegisterById);

// Ruta para actualizar un registro por su ID
router.put('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.updateRegister);

// Ruta para eliminar un registro por su ID
router.delete('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.deleteRegister);

module.exports = router;