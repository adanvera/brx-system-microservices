const { Router } = require('express');
const { addOperation, getAllOperationsByClient, getAllOperations, extractOperations, extractOperationsByDate, getAllOperationsByDate, getOperationById,  } = require('../controllers/operations');


const router = Router();

router.post('/', addOperation);
router.get('/:id', getAllOperationsByClient);
router.get('/', getAllOperations);
router.get('/all/:id_operations',getOperationById );
router.get('/extract/:id', extractOperations);
router.post('/extractByDate/:id', extractOperationsByDate);
router.post('/extractByDate',getAllOperationsByDate);

module.exports = router;