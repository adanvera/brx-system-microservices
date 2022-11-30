const { Router } = require('express');
const { getMiningMachines, addMinero, getminerobyid, miningSummary } = require('../controllers/miningmachines');

const router = Router();

router.get('/', getMiningMachines)
router.post('/', addMinero)
router.get('/:id', getminerobyid)
router.get('/get/summary', miningSummary)


module.exports = router;