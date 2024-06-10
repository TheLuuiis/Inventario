const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', authMiddleware, inventarioController.getAllEquiposInventario);
router.get('/:id', authMiddleware, inventarioController.getEquipoInventarioById);
router.post('/', authMiddleware, adminMiddleware, inventarioController.createEquipoInventario);
router.put('/:id', authMiddleware, adminMiddleware, inventarioController.updateEquipoInventario);
router.delete('/:id', authMiddleware, adminMiddleware, inventarioController.deleteEquipoInventario);

module.exports = router;