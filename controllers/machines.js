const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Machines = require('../models/machine');

const addMachine = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const machine = await Machines.create(req.body);

        res.json(machine)
        console.log('Añadimos la siguiente máquina');
        console.log(machine)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMachines = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const machines = await Machines.findAll();

        res.json(machines)
        console.log('Obtenemos los siguientes datos');
        console.log(machines)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMachineById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const machine = await Machines.findOne({
            where: {
                id
            }
        });

        res.json(machine)
        console.log('Obtenemos los siguientes datos');
        console.log(machine)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteMachine = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const machine = await Machines.destroy({
            where: {
                id
            }
        });

        res.json(machine)
        console.log('Borramos los siguientes datos');
        console.log(machine)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addMachine,
    getMachines,
    getMachineById,
    deleteMachine
}