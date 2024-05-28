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

// Función para encontrar un usuario por su ID
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar usuarios por ciertos criterios
const findUsers = async (criteria) => {
    try {
        const users = await User.find(criteria);
        return users;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un usuario
const updateUser = async (userId, newData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
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
    findUserById,
    findUsers,
    updateUser,
    deleteUser
};

/*const obtenerUsuarios = () => {
    // hacer aqui la pinshi consulta ggg xDDDD
    return usuarios
}

module.exports = {
    obtenerUsuarios
}*/