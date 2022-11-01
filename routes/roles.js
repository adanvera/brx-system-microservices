const { Router } = require('express');
const { getRoles, getRolesByUserId, createRol } = require('../controllers/roles');

const router = Router();

router.get('/:id', getRolesByUserId);
router.get('/', getRoles);
router.post('/', createRol)

module.exports = router;