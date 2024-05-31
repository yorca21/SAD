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
// Controlador para encontrar usuarios por ciertos criterios
const findUsers = async (req, res) => {
    try {
        const criteria = req.query;
        const users = await UserQueries.findUsers(criteria);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error finding users', error });
    }
};
// Controlador para actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const newData = req.body;
        const updatedUser = await UserQueries.updateUser(userId, newData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Controlador para eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UserQueries.deleteUser(userId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = {
    createUser,
    getUserById,
    findUsers,
    updateUser,
    deleteUser
};

