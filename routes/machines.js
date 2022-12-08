const { Router } = require('express');
const { getMachines, addMachine, getMachineById, deleteMachine } = require('../controllers/machines');

const router = Router();
router.post('/', addMachine);
router.get('/', getMachines);
router.get('/:id', getMachineById);
router.delete('/:id', deleteMachine);

module.exports = router;