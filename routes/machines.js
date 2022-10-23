const { Router } = require('express');
const { getMachines, getMachineById } = require('../controllers/machines');

const router = Router();
router.get('/', getMachines);
router.get('/:id', getMachineById);

module.exports = router;