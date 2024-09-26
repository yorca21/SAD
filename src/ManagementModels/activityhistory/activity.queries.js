const ActivityLog = require('./ActivityLog');

//Funcion para crear un  nuevo registro de actividades 
const createActivityLog = async (activityData) => {
    try {
        const newActivityLog = new ActivityLog(activityData);
        await newActivityLog.save();
        return newActivityLog;
    } catch (error) {
        throw error;
    }
};

// Función para obtener todos los registros de actividad
const getAllActivityLogs = async () => {
    try {
        const activities = await ActivityLog.find()
            .populate({ path: 'record', model: 'Register' }) // Población del registro afectado
            .populate({ path: 'nameuser', model: 'User' });  // Población del usuario que realizó la acción
        return activities;
    } catch (error) {
        throw error;
    }
};

// Función para buscar registros de actividad por criterios
const findActivityLogs = async (criteria) => {
    try {
        const activities = await ActivityLog.find(criteria)
            .populate({ path: 'record', model: 'Register' })
            .populate({ path: 'nameuser', model: 'User' });
        return activities;
    } catch (error) {
        throw error;
    }
};

// Función para obtener un registro de actividad por su ID
const getActivityLogById = async (activityId) => {
    try {
        const activity = await ActivityLog.findById(activityId)
            .populate({ path: 'record', model: 'Register' })
            .populate({ path: 'nameuser', model: 'User' });
        return activity;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un registro de actividad
const deleteActivityLog = async (activityId) => {
    try {
        await ActivityLog.findByIdAndDelete(activityId);
        return {
             msg: 'Activity log deleted successfully' 
        };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createActivityLog,
    getAllActivityLogs,
    findActivityLogs,
    getActivityLogById,
    deleteActivityLog
};