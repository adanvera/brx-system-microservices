const sequelize = require("../database/db");
const { GET_ROL_BY_ID, ADD_ROL_TO_USER } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Role = require("../models/role");
const { getUserByDocument } = require("./user");

//obtiene el rol por usuario
const getRolesByUserId = async (req, res) => {
    const { token } = req.headers
    const { id: id_user } = req.params
    if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
    //verificamos el token si es valido o no ha expirado
    const isToken = await checkToken(token)
    if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
    const [results, metadata] = await sequelize.query(
        GET_ROL_BY_ID + id_user
    );

    res.json(results)
}

const getRoles = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const roles = await Role.findAll({ where: { status: 1 } });
        console.log('Obtenemos los siguientes datos');
        console.log(roles.dataValues);
        res.json(roles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createRol = async (req, res) => {
    const { token } = req.headers

    console.log(`Se obtiene los siguientes datos para insertar el rol `)
    console.log(req.body)

    if (!token) return res.status(400).json({ msg: `El token es obligatorio` })

    try {
        console.log('Intentaremos crear un role con los siguientes datos');
        console.log(req.body);
        const role = await Role.create(req.body);
        res.json(role);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getRolesByUserId,
    getRoles,
    createRol
}