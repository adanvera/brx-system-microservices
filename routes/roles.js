const { Router } = require('express');
const { getRoles, getRolesByUserId, createRol, updateRole, assignRole, updateUserRole, getRoleById } = require('../controllers/roles');

const router = Router();

router.get('/:id', getRolesByUserId);
router.get('/', getRoles);
router.post('/', createRol)
router.put('/:id', updateRole)
router.post('/roleadd', assignRole)
router.put('/roleadd/:id', updateUserRole)
router.get('/get/:id', getRoleById)

module.exports = router;