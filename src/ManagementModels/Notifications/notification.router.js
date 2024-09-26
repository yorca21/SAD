const { Router } = require('express');
const router = Router();
const notificationController = require('./notifications.controller');

// Ruta para crear una nueva notificación
router.post('/', notificationController.createNotification);

// Ruta para obtener todas las notificaciones
router.get('/', notificationController.getAllNotifications);

// Ruta para buscar notificaciones por criterios específicos
router.post('/search', notificationController.findNotifications); 

// Ruta para obtener una notificación por su ID
router.get('/:id', notificationController.getNotificationById);

// Ruta para actualizar una notificación por su ID
router.put('/:id', notificationController.updateNotification);

// Ruta para eliminar una notificación por su ID
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
