const { Router } = require('express');
const { createImportacion, getImportaciones,getImportacionesById, verifyImportArrival, deleteImportaciones, updateImportaciones
} = require('../controllers/importaciones')

const router = Router();

router.post(`/`, createImportacion)
router.get(`/`, getImportaciones)
router.get(`/:id`, getImportacionesById)
router.get(`/get/arrival`, verifyImportArrival)
router.delete(`/:id`, deleteImportaciones)
router.put(`/:id`, updateImportaciones)


module.exports = router
