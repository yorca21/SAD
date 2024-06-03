const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token de la cabecera de autorización
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Establecer el usuario en el objeto de solicitud
        next(); // Pasar al siguiente middleware
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
