const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaEquipoController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', authMiddleware, marcaController.getAllMarcas);
router.get('/:id', authMiddleware, marcaController.getMarcaById);
router.post('/', authMiddleware, adminMiddleware, marcaController.createMarca);
router.put('/:id', authMiddleware, adminMiddleware, marcaController.updateMarca);
router.delete('/:id', authMiddleware, adminMiddleware, marcaController.deleteMarca);

module.exports = router;