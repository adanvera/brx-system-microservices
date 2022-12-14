const { checkToken } = require("../helpers/verifyToken");
const Proveedores = require('../models/proveedores')

const createProveedor = async (req, res) => {
    const { token } = req.headers
    console.log(req.body);
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const proveedor = await Proveedores.create(req.body)
        res.json(proveedor)
        console.log(proveedor);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProveedores = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const proveedores = await Proveedores.findAll();
        res.json(proveedores)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProveedor,
    getProveedores,
}
