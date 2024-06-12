const jwt = require('jsonwebtoken');
const { User } = require('../modules/user/user.schema'); 
// Configuración de la clave secreta
const secretKey = process.env.JWT_SECRET || 'secret';
// Función para generar un token JWT
const generateToken = (userData) => {
    return jwt.sign(userData, secretKey, { expiresIn: '3h' });
};
// Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Authentication token not provided' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid authentication token' });
        req.user = decoded;
        next();
    });
};

module.exports = { 
    generateToken, 
    authenticateToken 
};
