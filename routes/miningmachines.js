const { Router } = require('express');
const { getMiningMachines, addMinero, getminerobyid } = require('../controllers/miningmachines');

const router = Router();

router.get('/', getMiningMachines)
router.post('/', addMinero)
router.get('/:id', getminerobyid)


module.exports = router;