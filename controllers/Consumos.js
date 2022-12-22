const { checkToken } = require("../helpers/verifyToken");
const Consumos = require("../models/Consumos");
const sequelize = require("../database/db");
const { GET_CONSUMO_BY_ID } = require("../helpers/querys");

const getConsumosById = async (req, res) => {
    const { id } = req.params;
    try {
        const consumos = await sequelize.query(GET_CONSUMO_BY_ID + (id), {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json({
            consumos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }
}

module.exports = {
    getConsumosById
}