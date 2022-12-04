const sequelize = require("../database/db");
const { Importacion } = require("../helpers/querys");
const Importaciones = require('../models/importaciones')

const createImportacion = async (req, res) => {
    const { token } = req.headers

    console.log(req.body);

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });

        const ticket = await Importaciones.create(req.body)
        if (ticket) {
            return res.status(200).json({
                ok: true,
                content: ticket,
                message: "Importacion creada correctamente"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: "Error al crear la importacion"
        })
    }
}

// const getImportaciones = async (req, res) => {
//     const { token } = req.headers

//     try {
//         if (!token) return res.status(400).json({ msg: `El token es obligatorio` });

//         const importaciones = await Importaciones.findAll()
//         if (importaciones) {
//             return res.status(200).json({
//                 ok: true,
//                 content: importaciones,
//                 message: "Importaciones obtenidas correctamente"
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             content: error,
//             message: "Error al obtener las importaciones"
//         })
//     }
// }

const getImportaciones = async (req, res) => {
    const { token } = req.headers

    try {

        

        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const [results, metadata] = await sequelize.query(
            Importacion
        )

        if (results) {
            return res.status(200).json({
                ok: true,
                content: results,
                message: "Importaciones obtenidas correctamente"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: "Error al obtener las importaciones"
        })
    }
}

const getImportacionById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });

        const importacion = await Importaciones.findOne({ where: { id_importacion: id } })
        if (importacion) {
            return res.status(200).json({
                ok: true,
                content: importacion,
                message: "Importacion obtenida correctamente"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: "Error al obtener la importacion"
        })
    }
}

const modifyImportacion = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });

        const importacion = await Importaciones.update(req.body, { where: { id_importacion: id } })
        if (importacion) {
            return res.status(200).json({
                ok: true,
                content: importacion,
                message: "Importacion modificada correctamente"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: "Error al modificar la importacion"
        })
    }
}

module.exports = {
    createImportacion,
    getImportaciones,
    getImportacionById,
    modifyImportacion
}