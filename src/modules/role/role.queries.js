const Role = require('./role.schema');

// Función para crear un nuevo rol
const createRole = async (roleData) => {
    try {
        const newRole = new Role(roleData);
        await newRole.save();
        return newRole;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar un rol por su ID
const findRoleById = async (roleId) => {
    try {
        const role = await Role.findById(roleId).populate({path: 'permission', select:'name'});
        return role;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar roles por ciertos criterios
const findRoles = async (criteria) => {
    try {
        const roles = await Role.find(criteria.name).populate({path :'permissions', select:'name'});
        return roles;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un rol
const updateRole = async (roleId, newData) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(roleId, newData, { new: true }).populate({path :'permissions', select:'name'});
        return updatedRole;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un rol
const deleteRole = async (roleId) => {
    try {
        await Role.findByIdAndDelete(roleId);
        return { message: 'Role deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRole,
    findRoleById,
    findRoles,
    updateRole,
    deleteRole
};
