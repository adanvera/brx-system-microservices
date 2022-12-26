const { Router } = require('express');
const { createGasto, getGastoSemanal, getGastoDelMes, getGastoDelAnio, getAllGastos, deleteGasto, getGastoById, updateGasto, getCantidadGastoPorMes } = require('../controllers/gastos');



const router = Router();
router.post('/', createGasto)
router.get('/', getAllGastos)
router.get('/get/week', getGastoSemanal)
router.get('/get/month', getGastoDelMes)
router.get('/get/year', getGastoDelAnio)
router.delete('/:id', deleteGasto)
router.get('/:id', getGastoById)
router.put('/:id', updateGasto)
router.get('/get/summary', getCantidadGastoPorMes)

module.exports = router;