const UserQueries = require('../user/user.queries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Controlador para iniciar sesión
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await UserQueries.findUsers({ username });
        if (!user || user.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generar token JWT
        const payload = {
            user: {
                id: user[0].id,
                username: user[0].username
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { username, password, personId } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await UserQueries.findUsers({ username });
        if (user && user.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Crear un nuevo usuario
        const userData = { username, password, person: personId };
        user = await UserQueries.createUser(userData);

        // Generar token JWT
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = { 
    loginUser, 
    registerUser 
};
