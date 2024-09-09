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

const findRoleById = async (req, res) => {
    try {
        const role = await RoleQueries.findRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding role', error });
    }
};

// const findRoleById = async (id) => {
//     try {
//         const role = await RoleQueries.findRoleById(id);
//         if (!role) {
//             throw new Error('Role not found');
//         }
//         return role;
//     } catch (error) {
       
//         throw error;
//     }
// };

// Controlador para encontrar un rol acorde a ciertos criterios
const findRoles = async (req, res) => {
    try {
        const criteria = req.query;
        const roles = await RoleQueries.findRoles(criteria);
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding roles', error });
    }
};

// Controlador para actualizar un rol
const updateRole = async (req, res) => {
    const roleId = req.params.id;
    const newRole = req.body;

    // Verificar que el roleId es válido
    if (!roleId || !newRole) {
        return res.status(400).json({ message: 'Invalid role ID or update data' });
    }

    try {
        // Llamar a la función de actualización del rol
        const updatedRole = await RoleQueries.updateRole(roleId, newRole);

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Enviar respuesta exitosa
        return res.status(200).json(updatedRole);
    } catch (error) {
        // Manejo de errores específicos y respuesta de error
        console.error('Error updating role:', error);
        return res.status(500).json({
            message: 'Error updating role',
            error: error.message || 'An unexpected error occurred',
        });
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
