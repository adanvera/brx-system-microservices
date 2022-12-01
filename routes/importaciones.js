const { Router } = require('express');
const { createImportacion, getImportaciones,
    getImportacionById,
    modifyImportacion } = require('../controllers/importaciones')

const router = Router();

router.post(`/`, createImportacion)
router.get(`/`, getImportaciones)
router.get(`/:id`, getImportacionById)
router.put(`/:id`, modifyImportacion)

module.exports = router
