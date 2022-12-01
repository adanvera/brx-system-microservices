const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Mining = require("../models/miningmachines")
const { GET_MINING_MACHINES, MINERS_SUMMARY } = require("../helpers/querys")

const getMiningMachines = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const miningmachines = await Mining.findAll();

        const [results, metadata] = await sequelize.query(GET_MINING_MACHINES)

        res.json(results)
        console.log('Obtenemos los siguientes datos');
        console.log(results)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addMinero = async (req, res) => {

    const { token } = req.headers
    const { machine_name, status, porcentaje, id_model, document, consume_machine, hashrate, tempmax
        , maxfan, ip } = req.body
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const miningmachines = await Mining.create({
            machinedata,
            machine_name,
            status,
            porcentaje,
            id_model,
            document,
            consume_machine,
            hashrate,
            tempmax,
            maxfan,
            ip
        })

        res.json(miningmachines)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getminerobyid = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const miningmachines = await Mining.findOne({
            where: {
                id_machine: id
            }
        })

        res.json(miningmachines)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const miningSummary = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query(
            MINERS_SUMMARY
        )
        res.json(results)
        console.log('Obtenemos los siguientes datos');
        console.log(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMiningMachines,
    addMinero,
    getminerobyid,
    miningSummary
}