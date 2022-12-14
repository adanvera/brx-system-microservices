const { Router } = require('express');
const { createProveedor, getProveedores } = require('../controllers/proveedores');

const router = Router();

router.get('/', getProveedores);
router.post('/', createProveedor);

module.exports = router;