const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { checkToken } = require('../helpers/verifyToken');
const { GET_USERS } = require('../helpers/querys');
const sequelize = require("../database/db");
const { sendRegisterMail } = require('./SendMailer');
const { getUserById } = require('../helpers/helper');

/**funcion para obtener usuarios de la base de datos */
const getUser = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const [results, metadata] = await sequelize.query(
            GET_USERS
        )

        res.json(results)
        console.log(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**funcion para obetener un usuario por id */
const getUserByID = async (req, res) => {
    const { id: id_user } = req.params
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

const getUserByDocument = async (document = '', id_user = '') => {
    console.log(`Obtenemos los datos docuemnte : ${document} y id_user ${id_user}`);
    try {
        if (document !== '') {
            const user = await User.findOne({ where: { document } });
            console.log('Se obtuvo el usuario');
            console.log(`Retornaremos los siguientes datos ${user.dataValues}`);
            return user
        } else {
            const user = await User.findOne({ where: { id_user } });
            return user
        }
    } catch (error) {
        return 'Ocurrio un error al obtener datos del usuario'
    }
}

const createUser = async (req, res) => {
    const { token } = req.headers
    const { password } = req.body

    console.log(`Se obtiene los siguientes datos para insertar el user `)
    console.log(req.body)

    if (!token) return res.status(400).json({ msg: `El token es obligatorio` })

    try {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const refPassword = req.body.password
        req.body.password = bcryptjs.hashSync(password, salt);
        const user = await User.create(req.body);
        //hacemos el envio del correo para enviarle las credenciales  
        await sendRegisterMail(req.body.email, refPassword)
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { token } = req.headers

    console.log('Obtenemos los siguientes datos: ');
    console.log(req.body);

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        console.log('Procedemos a actualizar el usuario');
        const [rowCount] = await User.update(req.body, { where: { id_user: id } })
        console.log(rowCount);
        if (rowCount == 0) return res.status(400).json({ msg: `Usuario con id ${id} no existe` });
        res.json({ msg: 'Usuario acutalizado exitosamente' });
        console.log("Actualización realizada");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const changePassword = async (req, res) => {
    const { id: id_user } = req.params
    const { token } = req.headers
    const { password } = req.body

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        console.log('Procedemos a actualizar la contraseña del usuario');

        // Encriptamos la contraseña
        const salt = bcryptjs.genSaltSync();
        req.body.password = bcryptjs.hashSync(password, salt);
        const [rowCount] = await User.update(req.body, { where: { id_user: id_user } })
        console.log(rowCount);
        if (rowCount == 0) return res.status(400).json({ msg: `Usuario con id ${id} no existe` });
        res.json({ msg: 'Contraseña acutalizado correctamente' });
        console.log('Termina cambio de contraseña del usuario');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUser,
    getUserByID,
    getUserByDocument,
    createUser,
    updateUser,
    changePassword,
}