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
        const user = await User.findById(userId).populate('person').populate('role');
        return user;
    } catch (error) {
        throw error;
    }
};
//funcion para encontrar un usuario por su nombre de usuario
const findByIdUsername = async (username) => {
    try {
        const user = await User.findOne({ username }).populate('person').populate('role');
        console.log(user)
        return user;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar usuarios por ciertos criterios
const findUsers = async (criteria) => {
    try {
        const users = await User.find(criteria).populate('person').populate('unit').populate('role');
        return users;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un usuario
const updateUser = async (userId, newData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true }).populate('person').populate('unit').populate('role');
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
    findByIdUsername,
    findUsers,
    updateUser,
    deleteUser
};
