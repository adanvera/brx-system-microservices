const sequelize = require("../database/db");
const { Importacion, MINERS_SUMMARY, IMPOR_BY_ID } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Client = require("../models/client");
const Importaciones = require('../models/importaciones');
const { sendNotificationImportation } = require("./SendMailer");

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

        const [results, metadata] = await sequelize.query(
            Importacion
        )

        res.json(results)
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
        const [results, metadata] = await sequelize.query(
            IMPOR_BY_ID + id
        )

        res.json(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const verifyImportArrival = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const importaciones = await Importaciones.findAll()

        /**verificar si fecha de arribo falta menos de 4 dias */

        importaciones.forEach(async (importacion) => {
            const fechaArribo = new Date(importacion.fecha_arribo)
            const fechaActual = new Date()
            const resta = fechaArribo - fechaActual
            const dias = Math.floor(resta / (1000 * 60 * 60 * 24))
            if (dias <= 4) {

                const client = await Client.findOne({ where: { id_client: importacion.id_cliente } });
                const clientMail = client.dataValues.email

                sendNotificationImportation(importacion.articulos, dias, clientMail)
                // console.log(importacion.id_importacion + "  ___ " + dias + " falta dias para que llegue la importación");
            }
        });

        res.json("notificaciones enviadas")

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteImportaciones = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const importacion = await Importaciones.findOne({ where: { id_importacion: id } });
        if (!importacion) return res.status(400).json({ msg: `No existe la importación con el id ${id}` });

        await importacion.destroy()

        res.json({ msg: `La importación con el id ${id} fue eliminada` })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createImportacion,
    getImportaciones,
    getImportacionesById,
    verifyImportArrival,
    deleteImportaciones
}



