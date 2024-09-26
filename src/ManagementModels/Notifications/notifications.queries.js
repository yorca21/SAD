const Notification = require('./Notifications');
// Función para crear una nueva notificación
const createNotification = async (notificationData) => {
    try {
        const newNotification = new Notification(notificationData);
        await newNotification.save();
        return newNotification;
    } catch (error) {
        throw error;
    }
};

// Función para obtener todas las notificaciones
const getAllNotifications = async () => {
    try {
        const notifications = await Notification.find();
         return notifications;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar notificaciones por criterios específicos
const findNotifications = async (criteria) => {
    try {
        const notifications = await Notification.find(criteria);

        return notifications;
    } catch (error) {
        throw error;
    }
};

// Función para obtener una notificación por su ID
const getNotificationById = async (notificationId) => {
    try {
        const notification = await Notification.findById(notificationId);
        return notification;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar una notificación por su ID
const updateNotification = async (notificationId, newData) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(notificationId, newData, { new: true });
        return updatedNotification;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar una notificación por su ID
const deleteNotification = async (notificationId) => {
    try {
        await Notification.findByIdAndDelete(notificationId);
        return {
             msg: 'Notification deleted successfully' 
        };
    } catch (error) {
        throw error;
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