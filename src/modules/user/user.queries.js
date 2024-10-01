//aqui van todas las consultas 
const User = require('./user.schema');

// Función para crear un nuevo usuario
const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
};
// Función para obtener todos los usuarios
const allUsers = async () => {
    try {
        const users = await User.find()
            .populate({ path: 'person', model: 'Person' })
            .populate({ path: 'permissions', model: 'Permission' })
            .populate({ path: 'roles', model: 'Role' })
            .populate({ path: 'unit', model: 'Unit' });
       
        return users;
    } catch (error) {
        throw error;
    }
};
// Función para encontrar usuarios por ciertos criterios
const findUsers = async (criteria) => {
    try {
       
        const users = await User.find(criteria)
            .populate({ path: 'person', model: 'Person' })
            .populate({ path: 'permissions', model: 'Permission' })
            .populate({ path: 'roles', model: 'Role' })
            .populate({ path: 'unit', model: 'Unit' });

          return users;
    } catch (error) {
        console.error('Error finding users:', error);
        throw error;
    }
};
// Función para encontrar un usuario por su ID
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate({ path: 'person', model: 'Person' })
        .populate({ path: 'permissions', model: 'Permission' })
        .populate({ path: 'roles', model: 'Role' })
        .populate({ path: 'unit', model: 'Unit' });
        return user;
    } catch (error) {
        throw error;
    }
};
//funcion para encontrar un usuario por su nombre de usuario
const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username }).populate({ path: 'person', model: 'Person' })
        .populate({ path: 'permissions', model: 'Permission' })
        .populate({ path: 'name', model: 'Role' })
        .populate({ path: 'unit', model: 'Unit' });
         return user;
    } catch (error) {
        throw error;
    }
};



// Función para actualizar un usuario
const updateUser = async (userId, newData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true })
        .populate({ path: 'person', model: 'Person' })
        .populate({ path: 'permissions', model: 'Permission' })
        .populate({ path: 'roles', model: 'Role' })
        .populate({ path: 'unit', model: 'Unit' });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar un usuario
const deleteUser = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    allUsers,
    findUserById,
    findUserByUsername,
    findUsers,
    updateUser,
    deleteUser
};
