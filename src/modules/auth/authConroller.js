const jwt = require('jsonwebtoken');
const User = require('../user/user.schema');
const { createUser } = require('../user/user.queries'); 
const { hashPassword, comparePassword } = require('../../helpers/authUtils');
 
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).populate('person role unit');
        
        if (!user) {
            return res.status(401).json({ message: 'Username incorrect' });
        }
    
        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {

            return res.status(401).json({ message: 'Password incorrect' });
        }
        const token = jwt.sign({
             userId: user._id, 
             username: user.username, 
             role: user.role 
        }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        return res.json({ token });
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(500).json({ message: 'Authentication Error:' });
    }
};

exports.register = async (req, res) => {
    const { username, password, personId, roleId } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already in use' });
        }
             
        const hashedPassword = await hashPassword(password);

        // Crear un nuevo usuario utilizando la función de creación de usuario del archivo user.queries.js
        const newUser = await createUser({
            username,
            password: hashedPassword,
            person: personId,
            role: roleId
        });

        return res.status(201).json({ message: 'User successfully registered', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user' });
    }
};
