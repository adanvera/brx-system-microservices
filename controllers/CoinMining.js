
const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const CoinMining = require("../models/coinmining");

const createCoinMining = async (req, res) => {
    const { token } = req.headers
    console.log(req.body);
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const coinMining = await CoinMining.create(req.body)
        res.json(coinMining)
        console.log(coinMining);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getCoinMiningById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const [results] = await sequelize.query(`SELECT id_coinmining, id_machine, amount, created_at, updated_at FROM gestionagil_prodDB.coinminings WHERE CAST(created_at AS DATE)  BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND NOW() AND id_machine = ${id}`)

        res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCoinMining,
    getCoinMiningById
}