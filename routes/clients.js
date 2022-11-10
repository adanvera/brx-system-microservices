const { Router } = require('express');
const { getAllClients, createClient, deleteUser, deleteClient, getClientByID, updateClient } = require('../controllers/client');



const router = Router();


router.get('/',getAllClients)
router.get('/:id',getClientByID)

router.post('/',createClient)
router.delete('/:id',deleteClient)
router.put('/:id',updateClient)




module.exports = router;