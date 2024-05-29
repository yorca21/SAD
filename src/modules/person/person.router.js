const { Router } = require('express');
const personController = require('./person.controller');
const router = Router();

// Ruta para crear una nueva persona
router.post('/', personController.createPerson);

// Ruta para encontrar una persona por su ID
router.get('/:id', personController.findPersonById);

// Ruta para encontrar personas por ciertos criterios
router.get('/', personController.findPersons);

// Ruta para actualizar una persona
router.put('/:id', personController.updatePerson);

// Ruta para eliminar una persona
router.delete('/:id', personController.deletePerson);

module.exports = router;
