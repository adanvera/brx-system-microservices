const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Mining = require("../models/miningmachines")

const getMiningMachines = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const miningmachines = await Mining.findAll();
        console.log('Obtenemos los siguientes datos')
        console.log(miningmachines.dataValues);

        res.json(miningmachines);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports ={
    getMiningMachines
}