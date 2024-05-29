const PermissionQueries = require('./permission.queries');

// Controlador para crear un nueva permiso
const createPermission = async (req, res) => {
    try {
        const permissionData = req.body;
        const newPermission = await PermissionQueries.createPermission(permissionData);
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: 'Error creating permission', error });
    }
};

// Controlador para encontrar un permiso por su ID
const findPermissionById = async (req, res) => {
    try {
        const permissionId = req.params.id;
        const permission = await PermissionQueries.findPermissionById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Error finding permission', error });
    }
};

// Controlador para encontrar permisos por ciertos criterios
const findPermissions = async (req, res) => {
    try {
        const criteria = req.query;
        const permissions = await PermissionQueries.findPerpermissions(criteria);
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error finding permissions', error });
    }
};

// Controlador para actualizar una persona
const updatePermission = async (req, res) => {
    try {
        const permissionId = req.params.id;
        const newData = req.body;
        const updatedPermission = await PermissionQueries.updatePermission(permissionId, newData);
        if (!updatedPermission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(updatedPermission);
    } catch (error) {
        res.status(500).json({ message: 'Error updating permission', error });
    }
};

// Controlador para eliminar una persona
const deletePermission = async (req, res) => {
    try {
        const permissionId = req.params.id;
        const result = await PermissionQueries.deletePermission(permissionId);
        if (!result) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting permission', error });
    }
};

module.exports = {
    createPermission,
    findPermissionById,
    findPermissions,
    updatePermission,
    deletePermission
};
