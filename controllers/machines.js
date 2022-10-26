const sequelize = require("../database/db");
const { GET_MACHINE_BY_ID } = require("../helpers/querys");
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

        const machines = await Machines.findAll({ where: { status: 1 } });
        console.log('Obtenemos los siguientes datos')
        console.log(machines.dataValues);

        res.json(machines);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMachineById = async (req, res) => {
    const { token } = req.headers
    const { id: id_machine } = req.params

    if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
    //verificamos el token si es valido o no ha expirado
    const isToken = await checkToken(token)
    if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

    const [results, metadata] = await sequelize.query(
        GET_MACHINE_BY_ID + id_machine
    )

    res.json(results)

    console.log(results)
}

module.exports = {
    getMachines,
    getMachineById
}