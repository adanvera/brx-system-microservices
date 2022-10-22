const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { checkToken } = require('../helpers/verifyToken');

/**funcion para obtener usuarios de la base de datos */
const getUser = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const user = await User.findAll({ attributes: { exclude: ['password'] }, where: { status: 1 } });
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**funcion para obetener un usuario por id */
const getUserByID = async (req, res) => {
    const { document: id_user } = req.params
    const { token } = req.headers

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos si esta logueado y el token aun no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        if (!id_user) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const user = await User.findOne({ where: { id_user } });
        if (!user) return res.status(400).json({ msg: `Usuario con id ${id_user} no existe` });
        delete user.dataValues.password
        res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUser,
    getUserByID,
}