const sequelize = require("../database/db");
const { GET_ROL_BY_ID, ADD_ROL_TO_USER, UPDATE_ROL_TO_USER, GET_ROLE_ID } = require("../helpers/querys");
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

const updateRole = async (req, res) => {
    const { id } = req.params
    const { token } = req.headers

    console.log(`Se obtiene los siguientes datos para actualizar el rol `)
    console.log(req.body)

    try {
        console.log('Actualizando datos del rol');
        const [rowCount] = await Role.update(req.body, { where: { id_role: id } })
        console.log(rowCount);
        if (rowCount == 0) return res.status(400).json({ msg: `Rol con id ${id} no existe` });
        res.json({ msg: 'Datos de rol acutalizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const assignRole = async (req, res) => {

    const { token } = req.headers
    console.log(`Se obtiene los siguientes datos para insertar el rol al usuario `)
    console.log(req.body)
    if (!token) return res.status(400).json({ msg: `El token es obligatorio` })

    const user = await getUserByDocument(req.body.document)
    console.log('Obtenemos el usuario');

    console.log(user);

    try {
        const [results, metadata] = await sequelize.query(
            ADD_ROL_TO_USER, {
            replacements: [user.id_user, req.body.id_role]
        }

        );
        res.json({ msg: 'Se ha añadido el rol al usuario correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUserRole = async (req, res) => {

    const { token } = req.headers
    console.log(`Se obtiene los siguientes datos para insertar el rol al usuario `)
    console.log(req.body)
    if (!token) return res.status(400).json({ msg: `El token es obligatorio` })

    const user = await getUserByDocument(req.body.document)
    console.log('Obtenemos el usuario');

    try {
        const [results, metadata] = await sequelize.query(
            UPDATE_ROL_TO_USER, {
            replacements: [req.body.id_role, user.id_user,]
        }

        );
        res.json({ msg: 'Se ha actualizado el rol del usuario' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRoleById = async (req, res) => {
    const { token } = req.headers
    const { id: id_role } = req.params

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const [results, metadata] = await sequelize.query(
            GET_ROLE_ID + id_role
        );
        res.json(results)
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getRolesByUserId,
    getRoles,
    createRol,
    updateRole,
    assignRole,
    updateUserRole,
    getRoleById
}