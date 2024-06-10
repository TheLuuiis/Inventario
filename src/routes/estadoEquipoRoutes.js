const express = require('express');
const router = express.Router();
const estadoEquipoController = require('../controllers/estadoEquipoController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', authMiddleware, estadoEquipoController.getAllEstadosEquipo);
router.get('/:id', authMiddleware, estadoEquipoController.getEstadoEquipoById);
router.post('/', authMiddleware, adminMiddleware, estadoEquipoController.createEstadoEquipo);
router.put('/:id', authMiddleware, adminMiddleware, estadoEquipoController.updateEstadoEquipo);
router.delete('/:id', authMiddleware, adminMiddleware, estadoEquipoController.deleteEstadoEquipo);

module.exports = router;