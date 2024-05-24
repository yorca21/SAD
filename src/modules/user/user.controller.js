const { obtenerUsuarios } = require("./user.queries")
const User = require("./user.schema")
const getUsers = async (req, res) => {
    const users = await obtenerUsuarios()
    return res.status(200).json(users)
}
module.exports = {
     getUsers
}