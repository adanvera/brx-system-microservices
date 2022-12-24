


const { Router } = require('express');
const { getCoinMiningById } = require('../controllers/coinmining');



const router = Router();

router.get('/:id', getCoinMiningById)

module.exports = router;