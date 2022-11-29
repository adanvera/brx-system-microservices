const { Router } = require('express');
const { getMiningMachines, addMinero } = require('../controllers/miningmachines');

const router = Router();

router.get('/', getMiningMachines)
router.post('/', addMinero)


module.exports = router;