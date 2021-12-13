const express = require('express');
const router = express.Router();

const productoRouter = require('./productoRouter');
const usersRouter = require('./usersRouter');

router.use('/product', productoRouter);
router.use('/users', usersRouter);

module.exports = router;
