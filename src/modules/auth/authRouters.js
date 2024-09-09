const { Router } = require('express');
const router = Router();
const  authController  = require('./authController');

// Ruta para el inicio de sesión 
router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

// Ruta para validar el token
router.get('/validate', authController.validateToken);

module.exports = router;
