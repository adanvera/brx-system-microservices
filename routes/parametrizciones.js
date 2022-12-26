const { Router } = require('express');
const { addParams, getAllParams, updateParams, deleteParam, getParamByCodigo } = require('../controllers/parametrizaciones');

const router = Router();

router.post('/', addParams);
router.get('/', getAllParams);
router.get('/:codigo', getParamByCodigo);
router.put('/:codigo', updateParams);
router.delete('/:codigo', deleteParam);

module.exports = router;