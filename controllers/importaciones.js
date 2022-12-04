const sequelize = require("../database/db");
const { Importacion } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Importaciones = require('../models/importaciones')

const createImportacion = async (req, res) => {
    const { token } = req.headers
    console.log(req.body);
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const importacion = await Importaciones.create(req.body)
        res.json(importacion)
        console.log(importacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getImportaciones = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const importacion = await Importaciones.findAll();
        res.json(importacion)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getImportacionesById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const importacion = await Importaciones.findOne({ where: { id_importacion: id } });
        res.json(importacion)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createImportacion,
    getImportaciones,
    getImportacionesById
}

