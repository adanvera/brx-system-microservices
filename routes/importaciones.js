const { Router } = require('express');
const { createImportacion, getImportaciones,getImportacionesById
} = require('../controllers/importaciones')

const router = Router();

router.post(`/`, createImportacion)
router.get(`/`, getImportaciones)
router.get(`/:id`, getImportacionesById)


module.exports = router
