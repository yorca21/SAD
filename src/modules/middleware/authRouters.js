const { Router } = require('express');
const router = Router();
const { loginUser, registerUser } = require('./authController');

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

module.exports = router;
