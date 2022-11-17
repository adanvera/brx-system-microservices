const { Router } = require('express');
const { currentProfile, getAllMiners } = require('../Graphql/Queries');
const router = Router();

router.post('/allminers', getAllMiners);
router.post('/currentProfile', currentProfile)


module.exports = router;