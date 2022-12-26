const { Router } = require('express');
const { addParams, getAllParams, updateParams, deleteParam } = require('../controllers/parametrizaciones');

const router = Router();

router.post('/', addParams);
router.get('/', getAllParams);
router.put('/:codigo', updateParams);
router.delete('/:codigo', deleteParam);

module.exports = router;