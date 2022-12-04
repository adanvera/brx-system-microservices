const { Router } = require('express');
const { getMachines, addMachine, getMachineById } = require('../controllers/machines');

const router = Router();
router.post('/', addMachine);
router.get('/', getMachines);
router.get('/:id', getMachineById);

module.exports = router;