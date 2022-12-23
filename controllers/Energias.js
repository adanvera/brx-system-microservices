const { checkToken } = require("../helpers/verifyToken");
const Energias = require("../models/Energia");

const getAllEnergias = async (req, res) => {
    const { token } = req.headers
    try {
        console.log(`Se obtiene los siguientes datos para insertar la imagen `)
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` })
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        const energias = await Energias.findAll();
        res.json(energias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateEnergy = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params;
    const { precio } = req.body;

    try {
        console.log(`Se obtiene los siguientes datos para insertar la imagen `)
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` })
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        const energias = await Energias.update({
            precio
        }, {
            where: {
                id
            }
        });
        res.json(energias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getAllEnergias,
    updateEnergy
}