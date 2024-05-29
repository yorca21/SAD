const RoleQueries = require('./role.queries');

// Controlador para crear un nuievo rol
const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        const newRole = await RoleQueries.createPerson(roleData);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error });
    }
};

// Controlador para encontrarun rol por ID
const findRoleById = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await RoleQueries.findRoleById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error finding role', error });
    }
};

// Controlador para encontrar un rol acorde a ciertos criterios
const findRoles = async (req, res) => {
    try {
        const criteria = req.query;
        const roles = await RoleQueries.findRoles(criteria);
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error finding roles', error });
    }
};

// Controlador para actualizar un  rol
const updateRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const newRole = req.body;
        const updatedRole = await RoleQueries.updateRole(roleId, newRole);
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Role', error });
    }
};

// Controlador para eliminar un rol
const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const result = await RoleQueries.deleteRole(roleId);
        if (!result) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error });
    }
};

module.exports = {
    createRole,
    findRoleById,
    findRoles,
    updateRole,
    deleteRole
};
