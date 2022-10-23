const { Router } = require('express');
const { getTickets, getTicketById } = require('../controllers/tickets');

const router = Router();

router.get('/', getTickets)
router.get('/:id', getTicketById);

module.exports = router;