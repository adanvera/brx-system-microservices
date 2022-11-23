const { Router } = require('express');
const { addOperation, getAllOperationsByClient, getAllOperations,  } = require('../controllers/operations');


const router = Router();

router.post('/', addOperation);
router.get('/:id', getAllOperationsByClient);
router.get('/', getAllOperations);

module.exports = router;