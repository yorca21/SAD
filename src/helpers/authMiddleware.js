const jwt = require('jsonwebtoken');

// Cargar la clave secreta desde el entorno
const secretKey = process.env.JWT_SECRET ;
// Función para generar un token JWT
const generateToken = (payload, secretKey, expiresIn) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn }, (err, token) => {
            if (err) {
                console.error('Error al generar el token:', err);
                reject('Error al generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
    
   const authHeader = req.headers['authorization'];

   const token = authHeader && authHeader.split(' ')[1];
   
    if (!token) {
        return res.status(401).json({
             message: 'Authentication token not provided'
        });
    }

    jwt.verify(token, secretKey, (err, user) => {
       
        if (err) 
        return res.status(403).json({ 
           message: 'Invalid authentication token' });

        
        req.user = user;
        next();
    });
};


// Middleware para autorizar roles 
const authorizeRoles = (roles) => (req, res, next) => {
   
    const userData = req.user;
   
    if (!userData) {

        return res.status(401).json({
            msg: 'Role verification is required before validating the token'
        });
    }
    
    // Verifica si algún rol del usuario está en la lista de roles permitidos
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    
    const hasRole = rolesToCheck.some(role => 
        userData.roles.map(r => (r ? r.trim() : '')).includes(role ? role.trim() : '')
    );
    
    if (!hasRole) {
        
        return res.status(403).json({
            msg: 'Esta acción solo la puede realizar un Administrador.'
        });
    }

    next();
};

module.exports = {
    generateToken,
    authenticateToken,
    authorizeRoles
};
