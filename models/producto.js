const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  nombre: { type: String, required: [true, 'Nombre obligatorio'] },
  precio: { type: Number, required: [true, 'Precio'] },
  categoria: String,
  stock: Number,
  img: String,
  descripcion: String,

  // date:{type: Date, default:Date.now},
});

//Convertir a modelo
const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
