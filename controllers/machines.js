const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Machines = require("../models/machine");

/**obtinene listado de maquinas */
const getMachines = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const machines = await Machines.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'], }, where: { status: 1 } });
        console.log('Obtenemos los siguientes datos')
        console.log(machines.dataValues);

        res.json(machines);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMachines,
}