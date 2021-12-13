const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  //id: { type: Number, required: [true, "uuid obligatorio"] },
  nombre: { type: String, required: [true, 'Nombre obligatorio'] },
  apellido: { type: String, required: [true, 'Apellido obligatorio'] },
  usuario: { type: String, required: [true, 'Nombre obligatorio'] },
  email: { type: String, required: [true, 'Correo-e obligatorio'] },
  password: { type: String, required: [true, 'Correo-e obligatorio'] },
  rol: { type: String, required: [true, 'El rol es necesario'] }, // ADMIN, USER
  fecha: Date,
});

const User = mongoose.model('Users', usersSchema);
module.exports = User;
