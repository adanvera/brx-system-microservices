


const { Router } = require('express');
const { getCoinMiningById } = require('../controllers/CoinMining');



const router = Router();

router.get('/:id', getCoinMiningById)

module.exports = router;