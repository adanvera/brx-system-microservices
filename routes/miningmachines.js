const { Router } = require('express');
const { getMiningMachines, addMinero, getminerobyid, miningSummary, getMachineByDocument, updateToMantenience, updateMiningMachineStatus } = require('../controllers/miningmachines');
const { getTicketsByIdMachine } = require('../controllers/tickets');

const router = Router();

router.get('/', getMiningMachines)
router.post('/', addMinero)
router.get('/:id', getminerobyid)
router.get('/get/summary', miningSummary)
router.get('/get/summary/:document', getMachineByDocument)
router.put('/mantenience/:id', updateToMantenience)
router.put('/:id', updateMiningMachineStatus)
router.get('/get/machines/:id', getTicketsByIdMachine)


module.exports = router;