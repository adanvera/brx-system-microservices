const { checkToken } = require("../helpers/verifyToken");
const Gastos = require("../models/gastos");
const sequelize = require("../database/db");
const { GASTO_SUMMARY } = require("../helpers/querys");


const createGasto = async (req, res) => {
    const { token } = req.headers
    console.log(req.body);
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const gasto = await Gastos.create(req.body)
        res.json(gasto)
        console.log(gasto);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateGasto = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const gasto = await Gastos.update(req.body, {
            where: {
                id_gasto: id
            }
        })
        res.json(gasto)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteGasto = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const gasto = await Gastos.destroy({
            where: {
                id_gasto: id
            }
        })
        res.json(gasto)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getGastoById = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const gasto = await Gastos.findOne({
            where: {
                id_gasto: id
            }
        })
        res.json(gasto)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**consulta sql para obtener gasto semanal */


const getGastoSemanal = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const [results, metadata] = await sequelize.query(
            'SELECT SUM(amount) as week_amount FROM gestionagil_prodDB.gastos WHERE gestionagil_prodDB.gastos.created_at BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND NOW()',
        )
        res.json(results)


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getGastoDelMes = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const [results, metadata] = await sequelize.query(
            'SELECT SUM(gasto.amount) as month_amount FROM gestionagil_prodDB.gastos as gasto WHERE gasto.created_at  BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND NOW()',
        )
        res.json(results)
    }
    catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const getGastoDelAnio = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const [results, metadata] = await sequelize.query(
            'SELECT SUM(gasto.amount) as year_amount FROM gestionagil_prodDB.gastos as gasto WHERE gasto.created_at  BETWEEN DATE_SUB(CURDATE(), INTERVAL 365 DAY) AND NOW()',
        )
        res.json(results)
    }
    catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

const getAllGastos = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const gasto = await Gastos.findAll()
        res.json(gasto)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getCantidadGastoPorMes = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query(
            GASTO_SUMMARY
        )
        res.json(results)
        console.log('Obtenemos los siguientes datos');
        console.log(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createGasto,
    updateGasto,
    deleteGasto,
    getGastoById,
    getGastoSemanal,
    getGastoDelMes,
    getGastoDelAnio,
    getAllGastos,
    getCantidadGastoPorMes
}