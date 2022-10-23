const { Router } = require('express');
const { getMachines } = require('../controllers/machines');

const router = Router();
router.get('/', getMachines);

module.exports = router;