const sequelize = require("../database/db");
const { GET_TICKET_BY_ID, GET_TICKETS } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Ticket = require("../models/ticket");


const createTicket = async (req, res = response) => {
    const { token } = req.headers
    try {
        console.log(`Se obtiene los siguientes datos para insertar el ticket `)
        //await checkToken(token,req.session.user.id_user)
        const ticket = await Ticket.create(req.body)
        res.json(ticket);
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

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
}