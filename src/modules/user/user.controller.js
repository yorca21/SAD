const UserQueries = require('./user.queries');

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const newUser = await UserQueries.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un usuario por su ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserQueries.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Otros controladores para actualizar y eliminar usuarios pueden ser similares

module.exports = {
    createUser,
    getUserById
    // Otros controladores aquí
};

/*const { obtenerUsuarios } = require("./user.queries")
const User = require("./user.schema")
const getUsers = async (req, res) => {
    const users = await obtenerUsuarios()
    return res.status(200).json(users)
}
module.exports = {
     getUsers
}*/