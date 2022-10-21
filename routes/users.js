const { Router } = require('express');
const { getUser, getUserByID } = require('../controllers/user');

const router = Router();

router.get('/', getUser)
router.get('/:document', getUserByID)

module.exports = router;