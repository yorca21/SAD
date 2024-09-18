const { Router } = require('express');
const personController = require('./person.controller');
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');
const router = Router();

// Ruta para crear una nueva persona
router.post('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], personController.createPerson);

//ruta para listar las lpersonas 
router.get('/',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], personController.getAllPersons);

// Ruta para encontrar una persona por su ID
router.get('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], personController.findPersonById);

// Ruta para encontrar personas por ciertos criterios
router.get('/search',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], personController.findPersons);

// Ruta para actualizar una persona
router.put('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], personController.updatePerson);

// Ruta para eliminar una persona
router.delete('/:id',[authenticateToken, authorizeRoles(['super administrador', 'administrador'])], personController.deletePerson);

module.exports = router;
