const notificationQueries = require('./notifications.queries');
// Controlador para crear una nueva notificación
const createNotification = async (req, res) => {
    try {
        const notificationData = req.body; 
        const newNotification = await notificationQueries.createNotification(notificationData);
        return res.status(201).json(newNotification); 
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error creating notification', 
            error 
        });
    }
};

// Controlador para obtener todas las notificaciones
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationQueries.getAllNotifications();
        return res.status(200).json(notifications); 
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error fetching notifications',
             error
         });
    }
};

// Controlador para encontrar notificaciones por criterios específicos
const findNotifications = async (req, res) => {
    try {
        const criteria = req.body; // Obtiene los criterios de búsqueda del cuerpo de la solicitud
        const notifications = await notificationQueries.findNotifications(criteria);
        return res.status(200).json(notifications); // Devuelve las notificaciones que coinciden con los criterios
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error searching notifications', 
            error 
        });
    };
};

// Controlador para obtener una notificación por su ID
const getNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id; // Obtiene el ID de la notificación de los parámetros
        const notification = await notificationQueries.getNotificationById(notificationId);
        if (!notification) {
            return res.status(404).json({ 
                msg: 'Notification not found' 
            });
        }
       return res.status(200).json(notification); 
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error fetching notification', 
            error 
        });
    }
};

// Controlador para actualizar una notificación por su ID
const updateNotification = async (req, res) => {
    try {
        const notificationId = req.params.id; 
        const updatedData = req.body; 
        const updatedNotification = await notificationQueries.updateNotification(notificationId, updatedData);
        if (!updatedNotification) {
            return res.status(404).json({ 
                msg: 'Notification not found' 
            });
        }
        return res.status(200).json(updatedNotification); 
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error updating notification', 
            error 
        });
    }
};

// Controlador para eliminar una notificación por su ID
const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id; 
        await notificationQueries.deleteNotification(notificationId);
        return res.status(200).json({ 
            msg: 'Notification deleted successfully'
        }); 
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error deleting notification', 
            error 
        });
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    findNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
};