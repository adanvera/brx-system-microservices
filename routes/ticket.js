const { Router } = require('express');
const { getTickets } = require('../controllers/tickets');

const router = Router();

router.get('/', getTickets)


module.exports = router;