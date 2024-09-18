const Role = require('./role.schema');
const Permission = require('../permission/permission.schema')

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
//funcion para listar todos los roles 
const allRoles = async () =>{
    try {
        const roles = await Role.find().populate({ path: 'permissions', select: 'name' });;
        return roles;
    }catch(error) {
        throw error;
    }
}

// Función para encontrar un rol por su ID
const findRoleById = async (roleId) => {
    try {
        const role = await Role.findById(roleId).populate({ path: 'permissions', select: 'name' });
       // console.log(role);
        return role;
    } catch (error) {
        throw error;
    }
};

/// Función para encontrar roles por ciertos criterios
const findRoles = async (criteria) => {
    try {
        const roles = await Role.find(criteria).populate({ path: 'permission'});
        return roles;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un rol
const updateRole = async (roleId, newData) => {
    try {
        // Verificar que el rol existe
        const role = await Role.findById(roleId);
        if (!role) {
            throw new Error('Role not found');
        }

        // Validar permisos si están presentes en la actualización
        if (newData.permissions && newData.permissions.length > 0) {
            const validPermissions = await Permission.find({ _id: { $in: newData.permissions } });
            if (validPermissions.length !== newData.permissions.length) {
                throw new Error('Some permissions are invalid');
            }
        }

        // Actualizar los datos del rol
        Object.assign(role, newData); // Actualiza solo los campos específicos
        await role.save();

        // Poblar los permisos en el rol actualizado
        return await role.populate('permissions', 'name');
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
    allRoles,
    findRoleById,
    findRoles,
    updateRole,
    deleteRole
};
