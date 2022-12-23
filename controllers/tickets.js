const { request, response } = require("express");
const sequelize = require("../database/db");
const { gettingUseData } = require("../helpers/helper");
const { GET_TICKET_BY_ID, GET_TICKETS, TICKET_SUMMARY } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Ticket = require("../models/ticket");
const { sendNotificationTkt } = require("./SendMailer");
const GET_TICKET_BY_DATE = "SELECT * FROM tickets WHERE created_at BETWEEN ? AND ?"

const createTicket = async (req, res = response) => {
    const { token } = req.headers

    const asigned_to = req.body.asigned_to
    const userAsigned = await gettingUseData(asigned_to)
    console.log(userAsigned);
    try {
        console.log(`Se obtiene los siguientes datos para insertar el ticket `)

        const ticket = await Ticket.create(req.body)
        res.json(ticket);
        await sendNotificationTkt(userAsigned.email, ticket)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const getTickets = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        // const tickets = await Ticket.findAll({ where: { status: 1 } });
        const [results, metadata] = await sequelize.query(
            GET_TICKETS
        )
        res.json(results)
        console.log('Obtenemos los siguientes datos');
        console.log(results)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTicketById = async (req, res) => {
    const { token } = req.headers
    const { id: id_ticket } = req.params

    if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
    //verificamos el token si es valido o no ha expirado
    const isToken = await checkToken(token)
    if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });

    const [results, metadata] = await sequelize.query(
        GET_TICKET_BY_ID + id_ticket
    )

    res.json(results)

    console.log(results)
}

const modifyTicket = async (req, res) => {
    const { id } = req.params
    const { token } = req.headers

    console.log('Obtenemos los siguientes datos: ');
    console.log(req.body);

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos si esta logueado y el token aun no ha expirado

        console.log('Actualizando datos del ticket');
        const [rowCount] = await Ticket.update(req.body, { where: { id_ticket: id } })
        console.log(rowCount);
        if (rowCount == 0) return res.status(400).json({ msg: `Ticket con id ${id} no existe` });
        res.json({ msg: 'Datos de ticket acutalizado correctamente' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteTicket = async (req, res) => {
    const { id } = req.params
    const { token } = req.headers

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos si esta logueado y el token aun no ha expirado

        console.log('Eliminando ticket');
        const [rowCount] = await Ticket.update({ status: 0 }, { where: { id_ticket: id } })
        console.log(rowCount);
        if (rowCount == 0) return res.status(400).json({ msg: `Ticket con id ${id} no existe` });
        res.json({ msg: 'Ticket eliminado correctamente' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const ticketSummary = async (req, res) => {
    const { token } = req.headers
    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const [results, metadata] = await sequelize.query(
            TICKET_SUMMARY
        )
        res.json(results)
        console.log('Obtenemos los siguientes datos');
        console.log(results)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTicketsByIdMachine = async (req, res) => {
    const { token } = req.headers
    const { id: id_machine } = req.params

    try {
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` });
        const tickets = await Ticket.findAll({ where: { id_machine: id_machine } });
        res.json(tickets)
        console.log('Obtenemos los siguientes datos');
        console.log(tickets)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getAllTicketByDate = async (req =request,res = response)=>{
    let {fechaDesde,fechaHasta} = req.body
    
    fechaHasta = fechaHasta+' 00:00:00'
    fechaDesde = fechaDesde+' 23:59:00'
    try {
        const [results, metadata] = await sequelize.query(
            GET_TICKET_BY_DATE,{
            replacements:[ fechaDesde,fechaHasta]}
    
    
        );
        let summary = {
            totalTicket:0,
            openTicket:0,
            closeTicket:0,
            pendingTicket:0,
            inProgressTicket:0,
            onHoldTicket:0,
            rma:0,
            DESESTIMATED:0
        }
        summary.totalTicket = results.length
        results.forEach(ticket =>{
            switch (ticket.status) {
                case 'PENDING':
                    summary.pendingTicket++
                    break;
                case 'INPROGRESS':
                    summary.inProgressTicket++
                    break;
                case 'ONHOLD':
                    summary.onHoldTicket++
                    break;
                case 'CLOSED':
                    summary.closeTicket++
                    break;
                case 'RMA':
                    summary.rma++
                    break; 
                case 'DESESTIMATED':
                    summary.DESESTIMATED++
                    break;        
                default:
                    break;
            }
        })
        console.log('Datos del ticket');
        console.log(summary);
        res.status(200).json({
            summary
        })    
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Ocurrio un error'
        })
    }
    
}

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    modifyTicket,
    deleteTicket,
    ticketSummary,
    getTicketsByIdMachine,
    getAllTicketByDate
}