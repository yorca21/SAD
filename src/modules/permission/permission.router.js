const { Router } = require('express');
const permissionController = require('./permission.controller');
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');
const router = Router();

// Ruta para crear un nuevo permiso
router.post('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], permissionController.createPermission);

//ruta para listar todas las unidades 
router.get('/search',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], permissionController.getAllPermissions);

// Ruta para encontrar un permiso por su ID
router.get('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])],  permissionController.findPermissionById);

// Ruta para encontrar permisos bajo ciertos criterios
router.get('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], permissionController.findPermissions);

// Ruta para actualizar un permiso
router.put('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])],  permissionController.updatePermission);

// Ruta para eliminar un permiso
router.delete('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])],  permissionController.deletePermission);

module.exports = router;