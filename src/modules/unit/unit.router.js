const { Router } = require('express');
const unitController = require('./unit.controller');
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');
const router = Router();

// Ruta para crear una nueva unidad
router.post('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], unitController.createUnit);

//ruta para listar unidades 
router.get('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], unitController.getAllUnits);
// Ruta para encontrar una unidad por su ID
router.get('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], unitController.findUnitById);

// Ruta para encontrar unidades por ciertos criterios
router.get('/search',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], unitController.findUnits);

// Ruta para actualizar una unidad 
router.put('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], unitController.updateUnit);

// Ruta para eliminar una unidad
router.delete('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], unitController.deleteUnit);

module.exports = router;
