const { Router } = require('express');
const { addOperation, getAllOperationsByClient, getAllOperations, extractOperations, extractOperationsByDate,  } = require('../controllers/operations');


const router = Router();

router.post('/', addOperation);
router.get('/:id', getAllOperationsByClient);
router.get('/', getAllOperations);
router.get('/extract/:id', extractOperations);
router.post('/extractByDate/:id', extractOperationsByDate);

module.exports = router;