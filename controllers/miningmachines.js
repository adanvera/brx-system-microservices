const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Mining = require("../models/miningmachines")
const { GET_MINING_MACHINES, MINERS_SUMMARY } = require("../helpers/querys");
const { gettingClientByDocuemnt } = require("../helpers/helper");
const { sendMailMaintenance, sendMailMaintenanceRestore } = require("./SendMailer");

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
        , maxfan, ip, machinedata } = req.body
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

const getMachineByDocument = async (req, res) => {
    const { token } = req.headers
    const { document } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const miningmachines = await Mining.findAll({
            where: {
                document: document
            }
        })

        res.json(miningmachines)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateToMantenience = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const clientMachineData = await Mining.findOne({ where: { id_machine: id } })
        const machine = clientMachineData.dataValues
        const dataClient = await gettingClientByDocuemnt(clientMachineData.dataValues.document)
        const clientMail = dataClient.email

        const numberToMantenience = clientMachineData.historialMantenience + 1

        const miningmachines = await Mining.update({
            status: Number(3),
            historialMantenience: numberToMantenience
        }, {
            where: {
                id_machine: id
            }
        })

        await sendMailMaintenance(clientMail, machine)

        res.json(miningmachines)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateMiningMachineStatus = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    const { status } = req.body
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const clientMachineData = await Mining.findOne({ where: { id_machine: id } })
        const machine = clientMachineData.dataValues
        const dataClient = await gettingClientByDocuemnt(clientMachineData.dataValues.document)
        const clientMail = dataClient.email

        const miningmachines = await Mining.update({
            status: status
        }, {
            where: {
                id_machine: id
            }
        })

        await sendMailMaintenanceRestore(clientMail, machine)


        res.json(miningmachines)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMiningMachines,
    addMinero,
    getminerobyid,
    miningSummary,
    getMachineByDocument,
    updateToMantenience,
    updateMiningMachineStatus
}