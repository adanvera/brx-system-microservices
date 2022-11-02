const { Router } = require('express');
const { getUser, getUserByID, createUser, updateUser } = require('../controllers/user');

const router = Router();

router.get('/', getUser)
router.get('/:document', getUserByID)
router.post('/', createUser)
router.put('/:id', updateUser)

module.exports = router;