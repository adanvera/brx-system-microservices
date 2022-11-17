const sequelize = require("../database/db");
const { GET_OPERATIONS_BY_CLIENT } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Client = require("../models/client");
const Operation = require("../models/operation");

const addOperation = async (req,res) => {
    const { token } = req.headers
    const id_client = req.body.id_client
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        console.info("Pasoo : "+isToken);
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const existClient = await Client.findOne({where:{id_client}})
        if(!existClient) return res.status(400).json({msg:`cliente no  existecon codigo ${id_client} no existe `})
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

const getAllOperations = async (req,res)=>{
    const { token } = req.headers
 
    
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const operations = await Operation.findAll()
        res.status(200).json(operations)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })
    }
        

}

module.exports = {
    addOperation,
    getAllOperationsByClient,
    getAllOperations
}