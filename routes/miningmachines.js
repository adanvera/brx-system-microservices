const { Router } = require('express');
const { getMiningMachines } = require('../controllers/miningmachines');

const router = Router();

router.get('/', getMiningMachines)


module.exports = router;