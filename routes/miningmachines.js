const { Router } = require('express');
const { getMiningMachines, addMinero, getminerobyid, miningSummary, getMachineByDocument,
    updateToMantenience, updateMiningMachineStatus, deleteMiningMachine, calculateMiningCoins, getCoinsByDay, getCoinsByHourById, calculateConsumeMachinePowerByDay, getAmountDayPower, getConsumoMachineMiningMes, getSumCurrentMonth } = require('../controllers/miningmachines');

const router = Router();

router.get('/', getMiningMachines)
router.post('/', addMinero)
router.get('/:id', getminerobyid)
router.get('/get/summary', miningSummary)
router.get('/get/summary/:document', getMachineByDocument)
router.put('/mantenience/:id', updateToMantenience)
router.put('/:id', updateMiningMachineStatus)
router.delete('/:id', deleteMiningMachine)
router.get('/get/calculate', calculateMiningCoins)
router.get('/get/day/coins', getCoinsByDay)
router.get('/get/hour/coins', getCoinsByHourById)
router.get('/get/power', calculateConsumeMachinePowerByDay)
router.get('/get/power/amount', getAmountDayPower)
router.get('/get/power/mes/:id', getConsumoMachineMiningMes)
router.get('/get/amount/mes/:id', getSumCurrentMonth)



module.exports = router;