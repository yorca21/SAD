//aqui van todas las consultas 
const User = require('./user.schema');
const Person = require('../person/person.schema');
const Role = require('../role/role.schema');
const Unit = require('../unit/unit.schema');

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
        const users = await User.find().populate({ path: 'person', model: 'Person' }).populate({ path: 'role', model: 'Role' }).populate({ path: 'unit', model: 'Unit' });
        return users;
    } catch (error) {
        throw error;
    }
};
// Función para encontrar un usuario por su ID
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate({path:'name', model: Person}).populate({path:'name ', model: Role}).populate({path:'name ', model: Unit});
        return user;
    } catch (error) {
        throw error;
    }
};
//funcion para encontrar un usuario por su nombre de usuario
const findByIdUsername = async (username) => {
    try {
        const user = await User.findOne({ username }).populate({path:'name', model: Person}).populate({path:'name ', model: Role}).populate({path:'name ', model: Unit});
        console.log(user)
        return user;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar usuarios por ciertos criterios
const findUsers = async (criteria) => {
    try {
        const users = await User.find(criteria).populate({path:'name', model: Person}).populate({path:'name ', model: Role}).populate({path:'name ', model: Unit});
        return users;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar un usuario
const updateUser = async (userId, newData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true }).populate({path:'name', model: Person}).populate({path:'name ', model: Role}).populate({path:'name ', model: Unit});
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
    findByIdUsername,
    findUsers,
    updateUser,
    deleteUser
};
