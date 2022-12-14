const { response, request } = require("express");
const sequelize = require("../database/db");
const { GET_OPERATIONS_BY_CLIENT, GET_OPETARIONS_BY_DATE } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Client = require("../models/client");
const Operation = require("../models/operation");
const { sendVoucherOperations } = require("./SendMailer");
const REPORT_BY_DATE = "select * from operations WHERE created BETWEEN ? AND ?"



const addOperation = async (req,res) => {
    const { token } = req.headers
    const id_client = req.body.id_client
    let userId = []
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token,userId)
        console.log(userId[0]);
        
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const existClient = await Client.findOne({where:{id_client}})
        if(!existClient) return res.status(400).json({msg:`cliente no  existecon codigo ${id_client} no existe `})
        req.body.id_user = userId[0]
        const operation = await Operation.create(req.body)
        await sendVoucherOperations(operation,existClient)
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
        //cambiamos el formato
        results.map( op =>{
            if(op.type === "1"){
                op.type = "Compra"
            }else{
                op.type = "Venta"
            }
        })
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
        operations.map(op => {
            if(op.type === "1"){
                op.type = "Compra"
            }else{
                op.type = "Venta"
            }
        })
        res.status(200).json(operations)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })
    }
        

}
const extractOperations = async (req,res)=>{
    const { token } = req.headers
    const { id } = req.params 
    console.log("Recibimos parametros", id, token);
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        
        
        let listExtract = []
        
        const [results, metadata] = await sequelize.query(
            GET_OPERATIONS_BY_CLIENT,{
            replacements:[ Number(id)]}
        );
        
        //cambiamos el formato
        /* results.map( op =>{
            if(op.type === "1"){
                op.type = "Compra"
            }else{
                op.type = "Venta"
            }
        }) */
        results.forEach(( op )=>{
            let extract = {
                operation:'',
                cliente:'',
                compra:'',
                venta:'',
                comision:'',
                btc:'',
                usdt:'',
                fecha:'',
            
            }
            console.log(op);
            
            extract.fecha = op.created.toISOString().replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
            extract.btc = op.amount
            extract.usdt = op.usdt
            extract.operation = op.id_operations
            extract.cliente = id
            extract.comision = op.commission
            if(op.type === "1"){
                extract.compra = op.amount
                extract.venta = 0
            }else{
                extract.compra = 0
                extract.venta = op.amount
            }
            listExtract.push(extract)
            console.log(listExtract);
        })
        console.log("Lista cargada");
        console.log(listExtract);
        res.json(listExtract)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })
    }
        

}

const extractOperationsByDate = async (req,res)=>{
    /* const { token } = req.headers */
    const { id } = req.params 
    let {fechaDesde,fechaHasta,typeOperation} = req.body
    console.log('Recibimos fecha');
    console.log(req.body);
    console.log("Recibimos parametros", id);
    try {
        /* /*  */
        let listExtract = []
        fechaHasta = fechaHasta+' 23:59:00'
        fechaDesde = fechaDesde+ ' 00:00:00'
        let query = GET_OPETARIONS_BY_DATE
        if(typeOperation === '1'){
            query += " AND type = '1'"
        }else if(typeOperation === '0'){
            query += " AND type = '0'"
        }

        const [results, metadata] = await sequelize.query(
            query,{
            replacements:[ Number(id),fechaDesde,fechaHasta]}
        );
        
        //cambiamos el formato
        /* results.map( op =>{
            if(op.type === "1"){
                op.type = "Compra"
            }else{
                op.type = "Venta"
            }
        }) */
        results.forEach(( op )=>{
            let extract = {
                operation:'',
                cliente:'',
                compra:'',
                venta:'',
                comision:'',
                btc:'',
                usdt:'',
                fecha:'',
            
            }
            console.log(op);
            
            extract.fecha = op.created.toISOString().replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
            extract.btc = op.btc
            extract.usdt = op.usdt
            extract.operation = op.id_operations
            extract.cliente = id
            extract.comision = op.commission
            if(op.type === "1"){
                extract.compra = op.amount
                extract.venta = 0
            }else{
                extract.compra = 0
                extract.venta = op.amount
            }
            listExtract.push(extract)
            console.log(listExtract);
        })
        console.log("Lista cargada");
        console.log(listExtract);
        res.json(listExtract)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })
    }
        

}
const getAllOperationsByDate = async (req = request,res =response)=>{
    const { token } = req.headers
    let {fechaDesde,fechaHasta} = req.body
    console.log('Recibimos fecha');
    console.log(req.body);
    console.log("Recibimos parametros", token);
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        
        
        let summary = {
            totalAmountCompra:0,
            totalAmountVenta:0,
            totalAmountBTCVenta:0,
            totalAmountBTCCompra:0,
            totalAmountUSDTVenta:0,
            totalAmountUSDTCompra:0,
            totalOperations:0,
        }
        fechaHasta = fechaHasta+' 23:59:00'
        fechaDesde = fechaDesde+ ' 00:00:00'
        const [results, metadata] = await sequelize.query(
            REPORT_BY_DATE,{
            replacements:[fechaDesde,fechaHasta]}
        );
        summary.totalOperations = results.length        
        results.forEach(( op )=>{
           
            console.log(op);
            
            //sumario de compra y venta
            if(op.type === "1"){
                summary.totalAmountUSDTCompra += Number(op.amount)
                summary.totalAmountBTCCompra += Number(op.btc)
                summary.totalAmountCompra += Number(op.amount)
                
            }else{
                summary.totalAmountUSDTVenta += Number(op.amount)
                summary.totalAmountBTCVenta += Number(op.btc)
                summary.totalAmountVenta += Number(op.amount)
            }


           ;
        })
        console.log("Lista cargada");
        console.log(summary);
        res.json(summary)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        })
    }
       
}
const getOperationById = async (req,res) =>{
    const { id_operations } = req.params
    const operation = await Operation.findOne({where:{id_operations}})
    if(!operation) res.status(400).json({msg:'No se encuentra operacion con id'+id_operations})
    res.json({
        operation
    })

}
module.exports = {
    addOperation,
    getAllOperationsByClient,
    getAllOperations,
    extractOperations,
    extractOperationsByDate,
    getAllOperationsByDate,
    getOperationById
}