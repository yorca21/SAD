const UserQueries = require('./user.queries');

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const newUser = await UserQueries.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await UserQueries.allUsers(req.body);
        return res.status(201).json(users); 
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(500).json({ message: 'Error getting users:' });
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
        return res.status(200).json(user);
    } catch (error) {
        
        return res.status(500).json({ error: error.message });
    }
};
//controlador para obtener usuario por  su nombre de usuario 
const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await UserQueries.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Controlador para encontrar usuarios por ciertos criterios
const findUsers = async (req, res) => {
    try {
        const criteria = req.query;
        const users = await UserQueries.findUsers(criteria);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding users', error });
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
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error });
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
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    findUsers,
    updateUser,
    deleteUser
};

