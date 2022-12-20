const { Router } = require('express');
const { getTickets, getTicketById, createTicket, modifyTicket, deleteTicket, ticketSummary, getTicketsByIdMachine } = require('../controllers/tickets');

const router = Router();

router.post('/', createTicket)
router.get('/', getTickets)
router.get('/:id', getTicketById);
router.put('/:id', modifyTicket)
router.delete('/:id', deleteTicket)
router.get('/get/summary', ticketSummary)
router.get('/get/machines/:id', getTicketsByIdMachine)

module.exports = router;