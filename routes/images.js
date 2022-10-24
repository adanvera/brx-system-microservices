const { Router } = require('express');
const { upload } = require('../controllers/images');

const router = Router();


router.post("/", upload.single("image"))


module.exports = router;