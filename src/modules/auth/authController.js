const jwt = require('jsonwebtoken');
const User = require('../user/user.schema');
const { generateToken } = require('../../helpers/authMiddleware');


const jwtSecret = process.env.JWT_SECRET;
const  refreshJWT = process.env.REFRESH_TOKEN_SECRET ; 

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).populate('person roles unit permissions');
        
        if (!user) {
            return res.status(401).json({ message: 'Username incorrect' });
        }
        // verificacion de la contraña 
        const validPassword = await user.comparePassword(password);
       
        if (!validPassword) {
            return res.status(401).json({ message: 'Password incorrect' });
        }
        // payload que contiene la informacion del usuario 
        const tokenPayload = {
            userId: user._id, 
            username: user.username, 
            roles: user.roles.map(role => role.name),
            permissions: user.permissions,
            person: user.person,
            unit: user.unit
        };
     

        // Generar el Access Token
        const accessToken = await generateToken(tokenPayload, jwtSecret, '10h');

        // Generar el Refresh Token
        const refreshToken = await generateToken(tokenPayload, refreshJWT, '15h');
        
        //  Guardar el Refresh Token en la base de datos
        user.refreshToken = refreshToken;
         await user.save();

        // Enviar el Refresh Token como cookie
        res.cookie('refreshToken', refreshToken, { 
          httpOnly: true, 
          secure: false, //process.env.NODE_ENV === 'production', 
          sameSite: 'Lax'
        });
        
        // Devolver el Access Token al cliente
        return res.json({ accessToken });
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(500).json({ message: 'Authentication Error' });
    }
};
// refresh token 

exports.refreshToken = async (req, res) => {
    
    const refreshToken = req.cookies.refreshToken; 

    if (!refreshToken) 
        return res.status(401).json({ message: 'No se proporcionó refresh token' });

    try {
        // Verifica el refreshToken
        const decoded = jwt.verify(refreshToken, refreshJWT);
        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const payload ={
            userId: user._id,
            username: user.username,
            roles: user.roles.map(role => role.name),
            permissions: user.permissions,
            person: user.person,
            unit: user.unit
        }
        const newAccessToken = await generateToken(payload, jwtSecret, '10h');
        const newRefreshToken = await generateToken(payload, refreshJWT, '15h')

        // Actualiza el refresh token en la base de datos
        user.refreshToken = newRefreshToken;
        await user.save();

        // Enviar el nuevo Refresh Token como cookie
        res.cookie('refreshToken', newRefreshToken, { 
            httpOnly: true, 
            secure: false,//process.env.NODE_ENV === 'production', 
            sameSite: 'Strict'
        });

        return res.json({ accessToken: newAccessToken });

    } catch (error) {
        console.error('Refresh Token Error:', error);
        // if (error.name === 'TokenExpiredError') {
        //     return res.status(403).json({ message: 'Refresh token expired' });
        // }
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

// Validación de token
exports.validateToken = (req, res) => {
   
    const token = req.headers['x-token']; 
    
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

   
        req.user = decoded; 
        res.status(200).json({ 
            userId: decoded.userId, 
            username: decoded.username, 
            roles: decoded.roles, 
            permissions: decoded.permissions, 
            person: decoded.person, 
            unit: decoded.unit 
        });
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
