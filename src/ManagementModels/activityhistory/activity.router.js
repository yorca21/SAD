const { Router } = require('express');
const router = Router();
const activityController = require('./activity.controller');

// Ruta para crear un nuevo registro de actividad
router.post('/', activityController.createActivity);

// Ruta para obtener todos los registros de actividad
router.get('/', activityController.getAllActivities);

// Ruta para buscar registros de actividad por criterios específicos
router.post('/search', activityController.findActivities);

// Ruta para obtener un registro de actividad por su ID
router.get('/:id', activityController.getActivityById);

// Ruta para eliminar un registro de actividad por su ID
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
