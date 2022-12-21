const { Router } = require('express');
const { getMiningMachines, addMinero, getminerobyid, miningSummary, getMachineByDocument,
    updateToMantenience, updateMiningMachineStatus, deleteMiningMachine } = require('../controllers/miningmachines');

const router = Router();

router.get('/', getMiningMachines)
router.post('/', addMinero)
router.get('/:id', getminerobyid)
router.get('/get/summary', miningSummary)
router.get('/get/summary/:document', getMachineByDocument)
router.put('/mantenience/:id', updateToMantenience)
router.put('/:id', updateMiningMachineStatus)
router.delete('/:id', deleteMiningMachine)


module.exports = router;