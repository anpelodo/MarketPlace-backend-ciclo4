const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');
const auth = require('../middleware/auth');

router.post('/add', auth.verifyAdmin, productController.add); // Sólo el administrador
router.get('/list', productController.getAll); // Cualquiera
router.get('/:id', productController.getById); // Cualquiera
router.delete('/:id', auth.verifyAdmin, productController.del); // Sólo el administrador
router.put('/:id', auth.verifyAdmin, productController.update); // Sólo el administrador

module.exports = router;
