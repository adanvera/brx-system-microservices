const { Router } = require('express');
const { uploadImage } = require('../controllers/images');

const router = Router();

router.post("/", uploadImage)


module.exports = router;