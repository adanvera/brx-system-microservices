
const { checkToken } = require("../helpers/verifyToken");
const CoinMining = require("../models/CoinMining");

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

module.exports = {
    createCoinMining
}