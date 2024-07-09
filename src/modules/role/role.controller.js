const RoleQueries = require('./role.queries');

// Controlador para crear un nuievo rol
const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        const newRole = await RoleQueries.createRole(roleData);
        return res.status(201).json(newRole);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating role', error });
    }
};
//controlador  que muestra todos los roles 
const getAllRoles = async(req, res) => {
    try{
        const roles = await RoleQueries.allRoles();
        return res.status(200).json(roles);

    }catch(error) {
        return res.status(500).json({error: error.message});
    }
}
// Controlador para encontrarun rol por ID
const findRoleById = async (id) => {
    try {
        const role = await RoleQueries.findRoleById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    } catch (error) {
        console.error('Error finding role:', error);
        throw error;
    }
};

// Controlador para encontrar un rol acorde a ciertos criterios
const findRoles = async (req, res) => {
    try {
        const criteria = req.query;
        const roles = await RoleQueries.findRoles(criteria.name);
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding roles', error });
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
        return res.status(200).json(updatedRole);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating Role', error });
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
        return res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting role', error });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    findRoleById,
    findRoles,
    updateRole,
    deleteRole
};
