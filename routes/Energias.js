const { Router } = require('express');
const { getAllEnergias, updateEnergy } = require('../controllers/Energias');



const router = Router();


router.get('/', getAllEnergias)
router.put('/:id', updateEnergy)





module.exports = router;