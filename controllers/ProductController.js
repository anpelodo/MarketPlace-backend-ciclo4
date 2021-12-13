const Producto = require('../models/producto');

module.exports = {
  // Agrega un producto
  add: async (req, res) => {
    const body = req.body;

    try {
      const productoDB = await Producto.create(body);
      res.status(201).json(productoDB);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error,
      });
    }
  },

  // Obtiene un producto por ID
  getById: async (req, res) => {
    const _id = req.params.id;

    try {
      const productoDB = await Producto.findOne({ _id });

      return productoDB ? res.json(productoDB) : res.status(204).json({});
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error,
      });
    }
  },

  // Obtiene todos los productos
  getAll: async (req, res) => {
    try {
      const productoDB = await Producto.find();
      res.json(productoDB);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error,
      });
    }
  },

  // Elimina un producto por ID
  del: async (req, res) => {
    const _id = req.params.id;
    try {
      const productoDB = await Producto.findByIdAndDelete({ _id });

      if (!productoDB) {
        return res.status(400).json({
          mensaje: 'No se encontro el id indicado',
        });
      } else {
        return res.status(200).json({
          id: _id,
          status: true,
        });
      }
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error,
      });
    }
  },

  // Actualiza un producto
  update: async (req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
      const productoDB = await Producto.findByIdAndUpdate(_id, body, {
        new: true,
      });
      res.json(productoDB);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error,
      });
    }
  },
};
