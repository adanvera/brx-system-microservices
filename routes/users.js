const { Router } = require('express');
const { getUser, getUserByID, createUser, updateUser, changePassword, resetPassrod, summaryUser, getUserCantidadBlcoked, getUserCantidadActive } = require('../controllers/user');

const router = Router();

router.get('/', getUser)
router.get('/:id', getUserByID)
router.post('/', createUser)
router.put('/:id', updateUser)
router.put('/reset/:id', changePassword)
router.put('/psw/:id', resetPassrod)
router.get('/get/summary', summaryUser)
router.get('/get/summary/blocked', getUserCantidadBlcoked)
router.get('/get/summary/active', getUserCantidadActive)

module.exports = router;