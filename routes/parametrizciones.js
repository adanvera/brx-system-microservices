const { Router } = require('express');
const { addParams, getAllParams, updateParams } = require('../controllers/parametrizaciones');

const router = Router();

router.post('/', addParams);
router.get('/', getAllParams);
router.put('/:codigo', updateParams);

module.exports = router;