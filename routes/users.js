const { Router } = require('express');
const { getUser, getUserByID, createUser } = require('../controllers/user');

const router = Router();

router.get('/', getUser)
router.get('/:document', getUserByID)
router.post('/', createUser)

module.exports = router;