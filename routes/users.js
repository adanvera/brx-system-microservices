const { Router } = require('express');
const { getUser, getUserByID, createUser, updateUser, changePassword, resetPassrod } = require('../controllers/user');

const router = Router();

router.get('/', getUser)
router.get('/:id', getUserByID)
router.post('/', createUser)
router.put('/:id', updateUser)
router.put('/psw/:id', changePassword)
router.put('/reset/:id', resetPassrod)


module.exports = router;