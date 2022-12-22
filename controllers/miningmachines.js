const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Mining = require("../models/miningmachines")
const { GET_MINING_MACHINES, MINERS_SUMMARY, URL_BY_HOUR_BY_ID } = require("../helpers/querys");
const { gettingClientByDocuemnt } = require("../helpers/helper");
const { sendMailMaintenance, sendMailMaintenanceRestore } = require("./SendMailer");
const fetch = require('node-fetch');
const { FLOAT } = require("sequelize");
const CoinMining = require("../models/CoinMining");

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

        const numberToMantenience = Number(clientMachineData.historialMantenience) + 1

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

const deleteMiningMachine = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const miningmachines = await Mining.destroy({
            where: {
                id_machine: id
            }
        })

        res.json(miningmachines)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const calculateMiningCoins = async (req, res) => {
    try {

        const miningmachines = await Mining.findAll();
        const [results, metadata] = await sequelize.query(GET_MINING_MACHINES
            , { where: { id_machine: 0 } })

        results.forEach(async (machine) => {
            const created = machine.created_at
            /**verificar si ya paso 2 minutos despues de la ultima acutalizacion */
            const date = new Date(created)
            const dateNow = new Date()
            const diff = dateNow.getTime() - date.getTime()
            const minutes = Math.floor(diff / 1000 / 60)
            const speed = machine
            const consume_machine = machine.consume_machine
            const zeros = 1000000000000
            const sha = machine?.speed / zeros
            const dataSpeed = Number(sha)
            const status = machine.status
            const updated_at = new Date(machine.uptime)
            const diffDateBetweenUpdate = dateNow.getTime() - updated_at.getTime()
            const minutesBetweenUpdate = Math.floor(diffDateBetweenUpdate / 1000 / 60)

            /**funcion math random de 90 a 100 */
            const tempmax = Math.floor(Math.random() * (100 - 90) + 90)

            if (minutesBetweenUpdate >= 60 && status === 0) {

                const URL = "https://whattomine.com/asic.json?Authentication=none&factor[sha256_hr]=" + dataSpeed + "&sha256f=true"
                const response = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(json => {
                        return json
                    }
                    ).catch(err => {
                        console.log(err);

                    });

                const bitcoinRevenueDay = response?.coins?.Bitcoin.btc_revenue24
                const bitcoinRevenuePerHour = bitcoinRevenueDay

                await Mining.update({
                    status: 0,
                    tempmax: tempmax,
                }, {
                    where: {
                        id_machine: machine.id_machine
                    }
                })

                try {
                    await CoinMining.create({
                        id_machine: machine.id_machine,
                        amount: bitcoinRevenuePerHour,
                        type: "HOUR",
                    })
                } catch (error) {
                    return console.log(error.message);
                }
            }
        })
        res.json("se actualizo listado de mining coins")
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getCoinsByDay = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query('SELECT id_machine , SUM(CAST(amount  as float)) amount_day , created_at FROM gestionagil_prodDB.coinminings WHERE CAST(created_at AS DATE) = CURDATE()GROUP BY id_machine ')
        res.json(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getCoinsByHourById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params

    const id_machine = Number(id)
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query(URL_BY_HOUR_BY_ID)
        res.json(results)
    }
    catch (error) {
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
    updateMiningMachineStatus,
    deleteMiningMachine,
    calculateMiningCoins,
    getCoinsByDay,
    getCoinsByHourById
}