const sequelize = require("../database/db");
const { GET_OPERATIONS_BY_CLIENT } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Operation = require("../models/operation");

const addOperation = async (req,res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        
        const operation = await Operation.create(req.body)
        res.json({
            operation,
            msg:'Operacion creada correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })       
    }
        
}

const getAllOperationsByClient = async (req,res)=>{
    const { token } = req.headers
    const { id } = req.params 
    
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query(
            GET_OPERATIONS_BY_CLIENT,{
            replacements:[ Number(id)]}
        );
        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })
    }
        

}

module.exports = {
    addOperation,
    getAllOperationsByClient
}