const ActivityLogQueries =('./activity.queries');

// Controlador para crear un nuevo registro de actividad
const createActivity = async (req, res) => {
    try {
        const activityData = req.body;
        const newActivity = await ActivityLogQueries.createActivityLog(activityData);
        return res.status(201).json(newActivity);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error creating activity log', error 
        });
    }
};

// Controlador para obtener todos los registros de actividad
const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivityLogQueries.getAllActivityLogs();
       return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error retrieving activities', error 
        });
    }
};

// Controlador para buscar registros de actividad por criterios específicos
const findActivities = async (req, res) => {
    try {
        const criteria = req.body;
        const activities = await ActivityLogQueries.findActivityLogs(criteria);
        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error searching activities', error }
        );
    }
};

// Controlador para obtener un registro de actividad por su ID
const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await ActivityLogQueries.getActivityLogById(id);
        if (!activity) {
            return res.status(404).json({ 
                msg: 'Activity not found' });
        }
  
        return res.status(200).json(activity);
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error retrieving activity', error })
            ;
    }
};

// Controlador para eliminar un registro de actividad
const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        await ActivityLogQueries.deleteActivityLog(id);
        return res.status(200).json({ 
            msg: 'Activity log deleted successfully' 
        }
        );
    } catch (error) {
        return res.status(500).json({ 
            msg: 'Error deleting activity log', error 
        });
    }
};


module.exports = {
    createActivity,
    getAllActivities,
    findActivities,
    getActivityById,
    deleteActivity
};