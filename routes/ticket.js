const { Router } = require('express');
const { getTickets, getTicketById, createTicket } = require('../controllers/tickets');

const router = Router();

router.post('/', createTicket)
router.get('/', getTickets)
router.get('/:id', getTicketById);

module.exports = router;