const { Router } = require('express');
const { getRoles, getRolesByUserId, createRol, updateRole, assignRole, updateUserRole } = require('../controllers/roles');

const router = Router();

router.get('/:id', getRolesByUserId);
router.get('/', getRoles);
router.post('/', createRol)
router.put('/:id', updateRole)
router.post('/roleadd', assignRole)
router.put('/roleadd/:id', updateUserRole)

module.exports = router;