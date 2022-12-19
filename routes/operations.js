const { Router } = require('express');
const { addOperation, getAllOperationsByClient, getAllOperations, extractOperations,  } = require('../controllers/operations');


const router = Router();

router.post('/', addOperation);
router.get('/:id', getAllOperationsByClient);
router.get('/', getAllOperations);
router.get('/extract/:id', extractOperations);

module.exports = router;