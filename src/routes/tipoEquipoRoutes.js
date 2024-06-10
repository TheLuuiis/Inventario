const express = require('express');
const router = express.Router();
const tipoEquipoController = require('../controllers/tipoEquipoController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', authMiddleware, tipoEquipoController.getAllTiposEquipo);
router.get('/:id', authMiddleware, tipoEquipoController.getTipoEquipoById);
router.post('/', authMiddleware, adminMiddleware, tipoEquipoController.createTipoEquipo);
router.put('/:id', authMiddleware, adminMiddleware, tipoEquipoController.updateTipoEquipo);
router.delete('/:id', authMiddleware, adminMiddleware, tipoEquipoController.deleteTipoEquipo);

module.exports = router;