const sequelize = require("../database/db");
const { gettingClientById } = require("../helpers/helper");
const { Importacion, MINERS_SUMMARY, IMPOR_BY_ID } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Client = require("../models/client");
const Importaciones = require('../models/importaciones');
const { sendNotificationImportation, sendNotificationImportationPasado } = require("./SendMailer");

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

    try {
        const importaciones = await Importaciones.findAll()
        /**verificar si fecha de arribo falta menos de 4 dias */
        importaciones.forEach(async (importacion) => {



            const fechaArribo = new Date(importacion.fecha_arribo)
            const fechaActual = new Date(Date.now());

            /**get the difference between the fechaActual  and  fechaArribo */
            const diffTime = (fechaArribo - fechaActual);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


            

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            var compare = new Date(importacion.fecha_arribo)
            var day = String(compare.getDate()).padStart(2, '0');
            var month = String(compare.getMonth() + 1).padStart(2, '0'); //January is 0!
            var year = compare.getFullYear();
            compare = day + '/' + month + '/' + year;


            // /**diferencias de dias entre today e y compare */
            // var date1 = new Date(today);
            // var date2 = new Date(compare);
            // var diffTime = (date2 - date1);
            // var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            console.log("DIFERENCIA DE DIAS " + diffDays);


            if (diffDays <= 4 && diffDays >= 0) {
                const tracking_number = importacion.tracking_number
                const dateToArrival = importacion.fecha_arribo
                const id_client = importacion.id_cliente
                console.log("iD CLIENTE " + id_client);
                const client = await gettingClientById(id_client)
                const clientMail = client.email
                console.log("actualizando dias");
                const id_aux = importacion.id_importacion
                const impp = await Importaciones.findOne({ where: { id_importacion: id_aux } });
                if (!impp) return res.status(400).json({ msg: `No existe la importaci??n con el id ${id_aux}` });
                console.log("actualizando dias");
                await impp.update({ days: diffDays })
                console.log("actualizando dias fin");
                sendNotificationImportation(importacion.articulos, diffDays, clientMail, tracking_number, dateToArrival)
                console.log("Envio notifgicacion");
            }

            if (diffDays < 0) {
                const absDays = Math.abs(diffDays)
                const tracking_number = importacion.tracking_number
                const dateToArrival = importacion.fecha_arribo
                const id_client = importacion.id_cliente
                console.log("iD CLIENTE " + id_client);
                const client = await gettingClientById(id_client)
                const clientMail = client.email
                console.log("actualizando dias");
                const id_aux = importacion.id_importacion
                const impp = await Importaciones.findOne({ where: { id_importacion: id_aux } });
                if (!impp) return res.status(400).json({ msg: `No existe la importaci??n con el id ${id_aux}` });
                console.log("actualizando dias");
                await impp.update({ days: absDays })
                console.log("actualizando dias fin");
                sendNotificationImportationPasado(importacion.articulos, absDays, clientMail, tracking_number, dateToArrival)
                console.log("Envio notifgicacion");
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
        if (!importacion) return res.status(400).json({ msg: `No existe la importaci??n con el id ${id}` });

        await importacion.destroy()

        res.json({ msg: `La importaci??n con el id ${id} fue eliminada` })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateImportaciones = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const importacion = await Importaciones.findOne({ where: { id_importacion: id } });
        if (!importacion) return res.status(400).json({ msg: `No existe la importaci??n con el id ${id}` });

        await importacion.update(req.body)

        res.json({ msg: `La importaci??n con el id ${id} fue actualizada` })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createImportacion,
    getImportaciones,
    getImportacionesById,
    verifyImportArrival,
    deleteImportaciones,
    updateImportaciones
}



