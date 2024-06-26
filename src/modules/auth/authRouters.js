const { Router } = require('express');
const router = Router();
const authController = require('./authConroller');
const path = require('path');
// Ruta para el inicio de sesión 
router.post('/login', authController.login);

// Ruta para el registro de usuarios 
router.post('/register', authController.register);

module.exports = router;
