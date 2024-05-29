const { Router } = require('express');
const permissionController = require('./permission.controller');
const router = Router();

// Ruta para crear un nuevo permiso
router.post('/',  permissionController.createPermission);

// Ruta para encontrar una persona por su ID
router.get('/:id',  permissionController.findPermissionById);

// Ruta para encontrar permisos bajo ciertos criterios
router.get('/',  permissionController.findPermissions);

// Ruta para actualizar una persona
router.put('/:id',  permissionController.updatePermission);

// Ruta para eliminar un permiso
router.delete('/:id',  permissionController.deletePermission);

module.exports = router;