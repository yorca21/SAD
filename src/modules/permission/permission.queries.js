const Permission = require('./permission.schema');

// Función para crear un nuevo permiso 
const createPermission = async (permissionData) => {
    try {
        const newPermission = new Permission(permissionData);
        await newPermission.save();
        return newPermission;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar un permiso por ID
const findPermissionById = async (permissionId) => {
    try {
        const permission = await Permission.findById(permissionId);
        return permission;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar permisos por ciertos criterios
const findPermissions = async (criteria) => {
    try {
        const permissions = await Permission.find(criteria);
        return permissions;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un permiso
const updatePermission = async (permissionId, newData) => {
    try {
        const updatedPermission = await Permission.findByIdAndUpdate(permissionId, newData, { new: true });
        return updatedPermission;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un permiso
const deletePermission = async (permissionId) => {
    try {
        await Permission.findByIdAndDelete(permissionId);
        return { message: 'Permission deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPermission,
    findPermissionById,
    findPermissions,
    updatePermission,
    deletePermission
};