const sequelize = require("../database/db");
const { checkToken } = require("../helpers/verifyToken");
const Mining = require("../models/miningmachines")
const { GET_MINING_MACHINES, MINERS_SUMMARY, URL_BY_HOUR_BY_ID, MINING_BY_DOCUMENT } = require("../helpers/querys");
const { gettingClientByDocuemnt } = require("../helpers/helper");
const { sendMailMaintenance, sendMailMaintenanceRestore } = require("./SendMailer");
const fetch = require('node-fetch');
const { FLOAT } = require("sequelize");
const CoinMining = require("../models/coinmining");
const Consumos = require("../models/Consumos");
const Energia = require("../models/Energia");

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
    const { data } = req.body
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const miningmachines = await Mining.create(req.body)
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
        const [results, metadata] = await sequelize.query(MINING_BY_DOCUMENT + document)
        res.json(results)
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

        const miningmachines = await Mining.update({
            status: Number(5)
        }, {
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
            const updated_at = new Date(machine.mining_date)
            const diffDateBetweenUpdate = dateNow.getTime() - updated_at.getTime()
            const minutesBetweenUpdate = Math.floor(diffDateBetweenUpdate / 1000 / 60)

            console.log("MINING DATE", machine.mining_date);
            console.log("MINUTES BETWEEN UPDATE", minutesBetweenUpdate);

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

                const ulr_two = "https://api.minerstat.com/v2/coins?list=BTC"

                const response_two = await fetch(ulr_two, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        cors: 'no-cors'
                    },
                }).then(res => res.json())
                    .then(json => {
                        return json
                    }
                    ).catch(err => {
                        console.log(err);

                    });

                const bitcoinRevenueDay = response?.coins?.Bitcoin.btc_revenue24
                const price = response_two[0].price

                const bitcoinRevenuePerHour = bitcoinRevenueDay / 24

                const castodollar = bitcoinRevenuePerHour * price

                await Mining.update({
                    status: 0,
                    tempmax: tempmax,
                    amount_hour: bitcoinRevenuePerHour,
                    mining_date: new Date(),
                }, {
                    where: {
                        id_machine: machine.id_machine
                    }
                })

                try {
                    await CoinMining.create({
                        id_machine: machine.id_machine,
                        amount: bitcoinRevenuePerHour,
                        todollar: castodollar,
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
        const [results, metadata] = await sequelize.query('SELECT id_machine , SUM(CAST(amount  as float)) amount_day , created_at, updated_at FROM gestionagil_prodDB.coinminings WHERE CAST(created_at AS DATE) = CURDATE()GROUP BY id_machine ')
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

const calculateConsumeMachinePowerByDay = async (req, res) => {

    const { token } = req.headers
    const mining = await Mining.findAll({ where: { status: 0 } })

    mining.forEach(async (machine) => {

        const id_machine = machine.id_machine
        const consume_machine = machine.consume_machine
        const div = (consume_machine * 24) / 1000

        const pricePower = await Energia.findAll()

        const energyPrice = Number(pricePower[0]?.dataValues?.precio)
        console.log("Precio de la energia", energyPrice);

        const values = div * energyPrice
        /**retornar con dos decimales */
        const valuesFixed = values.toFixed(2)

        console.log("valueeeeeeeee ", valuesFixed);

        const update_at = new Date(machine.energy_date)
        const dateNow = new Date()
        const diffDateBetweenUpdate = dateNow.getTime() - update_at.getTime()
        const minutesBetweenUpdate = Math.floor(diffDateBetweenUpdate / 1000 / 60)

        if (minutesBetweenUpdate >= 1440) {
            try {
                await Consumos.create({
                    id_machine: machine.id_machine,
                    status: 0,
                    consumo: valuesFixed,
                })
                await Mining.update({
                    status: 0,
                    energy_date: new Date(),
                }, {
                    where: {
                        id_machine: machine.id_machine
                    }
                })
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
    })

    res.json("se actualizo listado de consumo de energia")

}


const getAmountDayPower = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query('SELECT id_machine, created_at, updated_at,  SUM(CAST(consumo  as float)) amount_day  FROM gestionagil_prodDB.consumos WHERE CAST(created_at AS DATE) = CURDATE()GROUP BY id_machine         ')
        res.json(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getConsumoMachineMiningMes = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query('SELECT id_consumo, id_machine, status, created_at, updated_at, SUM(CAST(consumo  as float)) consumo FROM gestionagil_prodDB.consumos WHERE YEAR(created_at) = YEAR(CURRENT_DATE()) AND MONTH(created_at)  = MONTH(CURRENT_DATE()) AND id_machine =' + id)
        res.json(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getSumCurrentMonth = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query('SELECT id_coinmining, id_machine, amount, created_at, updated_at, `type`, SUM(CAST(todollar  as float)) todollar  FROM gestionagil_prodDB.coinminings WHERE YEAR(created_at) = YEAR(CURRENT_DATE()) AND MONTH(created_at)  = MONTH(CURRENT_DATE()) AND id_machine = ' + id)
        res.json(results)
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
    updateMiningMachineStatus,
    deleteMiningMachine,
    calculateMiningCoins,
    getCoinsByDay,
    getCoinsByHourById,
    calculateConsumeMachinePowerByDay,
    getAmountDayPower,
    getConsumoMachineMiningMes,
    getSumCurrentMonth
}