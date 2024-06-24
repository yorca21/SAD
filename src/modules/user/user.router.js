const { Router } = require('express');
const userController = require('./user.controller');
const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para encontrar un usuario por su ID
router.get('/:id', userController.getUserById);  

// Ruta para encontrar un usuario por nombre de usuario 
router.get('/:username', userController.getUserByUsername);

// Ruta para encontrar usuarios por ciertos criterios
router.get('/', userController.findUsers);  

// Ruta para actualizar un usuario
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
