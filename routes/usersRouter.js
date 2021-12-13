const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const auth = require('../middleware/auth');

router.post('/add', usersController.add);
router.put('/:id', auth.verifyOwner, usersController.update); // El propio usuario o un administrador pueden editar
router.get('/list', auth.verifyAdmin, usersController.list); // Sólo el administrador
router.delete('/:id', auth.verifyOwner, usersController.del); // El propio usuario o un administrador pueden eliminar
router.post('/login', usersController.login);

module.exports = router;
