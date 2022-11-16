const { Router } = require('express');
const { addOperation, getAllOperationsByClient,  } = require('../controllers/operations');


const router = Router();

router.post('/', addOperation);
router.get('/:id', getAllOperationsByClient);

module.exports = router;