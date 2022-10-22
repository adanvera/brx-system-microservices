const { Router } = require('express');
const { getRoles, getRolesByUserId } = require('../controllers/roles');

const router = Router();

router.get('/:id', getRolesByUserId);
router.get('/', getRoles);

module.exports = router;