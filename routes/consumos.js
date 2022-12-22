const { Router } = require('express');
const { getConsumosById } = require('../controllers/Consumos');

const router = Router();


router.get('/:id',getConsumosById)





module.exports = router;