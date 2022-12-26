


const { Router } = require('express');
const { getCoinMiningById, getCoinminingDayById } = require('../controllers/coinmining');



const router = Router();

router.get('/:id', getCoinMiningById)
router.get('/get/day/coins/:id', getCoinminingDayById)

module.exports = router;