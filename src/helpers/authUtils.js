const bcrypt = require('bcryptjs');

//funcion para cifrar contraseñas antes de almacenarlas en la base de datos
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
// funcion para comparar contraseñas que ya esten introducidas con una contraseña almacenada cifrada para la autenticación del usuario.
const comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { 
    hashPassword, 
    comparePassword 
}