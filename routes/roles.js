const { Router } = require('express');
const { getRoles, getRolesByUserId, createRol, updateRole } = require('../controllers/roles');

const router = Router();

router.get('/:id', getRolesByUserId);
router.get('/', getRoles);
router.post('/', createRol)
router.put('/:id', updateRole)

module.exports = router;