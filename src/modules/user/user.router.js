const { Router } = require('express');
const userController = require('./user.controller');
const router = Router();
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware')

// Ruta para crear un nuevo usuario
router.post('/',[authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.createUser);

// Ruta para listar todos los usuarios 
router.get('/',[authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.getAllUsers);

 // Ruta para encontrar usuarios por ciertos criterios (ajustado para evitar conflictos)
router.get('/search', [authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.findUsers);  

// Ruta para encontrar un usuario por su ID
router.get('/:id', [authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.getUserById);  

// Ruta para encontrar un usuario por nombre de usuario 
router.get('/username/:username', [authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.getUserByUsername);

// Ruta para actualizar un usuario
router.put('/:id', [authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', [authenticateToken, authorizeRoles(['sueper administrador',' administrador'])], userController.deleteUser);

module.exports = router;
