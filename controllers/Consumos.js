const { checkToken } = require("../helpers/verifyToken");
const Consumos = require("../models/Consumos");
const sequelize = require("../database/db");
const { GET_MINEROS_REVENUE_BY_ID } = require("../helpers/querys");

const getConsumosById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
      
        const [results, metadata] = await sequelize.query(
            GET_MINEROS_REVENUE_BY_ID + id
        )

        res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getConsumosById
}
