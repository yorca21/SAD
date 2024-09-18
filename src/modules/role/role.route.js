const { Router } = require('express');
const roleController = require('./role.controller');
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');
const router = Router();

// Ruta para crear un nuevo rol
router.post('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], roleController.createRole);

///ruta para listar los roles
router.get('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], roleController.getAllRoles);

// Ruta para encontrar un rol por su ID
router.get('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], roleController.findRoleById);

// Ruta para encontrar roles por ciertos criterios
router.get('/search',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], roleController.findRoles);

// Ruta para actualizar un rol
router.put('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], roleController.updateRole);

// Ruta para eliminar un Rol
router.delete('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], roleController.deleteRole);

module.exports = router;
