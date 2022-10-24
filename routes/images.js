const { Router } = require('express');
const controller = require('../controllers/images')

const router = Router();

router.post(`/`, controller.upload, controller.uploadFile)
router.put(`/:id`, controller.upload, controller.updateImage)
router.get(`/:id`, controller.getImageById)

module.exports = router
