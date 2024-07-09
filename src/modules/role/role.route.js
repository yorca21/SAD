const { Router } = require('express');
const roleController = require('./role.controller');
const router = Router();

// Ruta para crear un nuevo rol
router.post('/', roleController.createRole);

///ruta para listar los roles
router.get('/', roleController.getAllRoles);

// Ruta para encontrar un rol por su ID
router.get('/:id', roleController.findRoleById);

// Ruta para encontrar roles por ciertos criterios
router.get('/', roleController.findRoles);

// Ruta para actualizar un rol
router.put('/:id', roleController.updateRole);

// Ruta para eliminar un Rol
router.delete('/:id', roleController.deleteRole);

module.exports = router;
