const { Router } = require('express');
const { getTickets, getTicketById, createTicket, modifyTicket } = require('../controllers/tickets');

const router = Router();

router.post('/', createTicket)
router.get('/', getTickets)
router.get('/:id', getTicketById);
router.put('/:id', modifyTicket)

module.exports = router;