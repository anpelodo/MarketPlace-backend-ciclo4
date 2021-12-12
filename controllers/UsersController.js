var bcrypt = require("bcryptjs");
const Users = require("../models/user");
const jwt = require("../services/token");

module.exports = {
  // Agrega un nuevo usuario
  add: async (req, res) => {
    let body = req.body;
    const password = body.password;

    try {
      body.password = await bcrypt.hash(password, 10);
      body.rol = "USER";
      const userDB = await Users.create(body);
      if (userDB) {
        res.status(200).json(userDB);
      } else {
        res.status(404).json({
          mensaje: "No se encontró el usuario"
        });
      }
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error
      });
    }
  },

  // Actualizar un usuario
  update: async (req, res) => {
    const _id = req.params.id;
    let body = req.body;
    body.rol = "USER";

    try {
      const userDB = await Users.findByIdAndUpdate(_id, body, {
        new: true
      });

      if (userDB) {
        res.status(200).json(userDB);
      } else {
        res.status(404).json({
          mensaje: "No se encontró el usuario"
        });
      }
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error
      });
    }
  },

  // Listar todos los usuarios
  list: async (req, res) => {
    try {
      const userDB = await Users.find();
      res.json(userDB);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error
      });
    }
  },

  // Eliminar un usuario
  del: async (req, res) => {
    const _id = req.params.id;

    try {
      const userDB = await Users.findByIdAndDelete({ _id });

      if (!userDB) {
        return res.status(404).json({
          mensaje: "No se encontró el usuario"
        });
      } else {
        return res.status(200).json({
          id: _id,
          status: true
        });
      }
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error
      });
    }
  },

  // Login de usuario.
  login: async (req, res) => {
    const _email = req.body.email;
    const _password = req.body.password;

    try {
      let user = await Users.findOne({ email: `${_email}` });
      if (user) {
        let match = await bcrypt.compare(_password, user.password);
        if (match) {
          let tokenReturn = await jwt.encode(user.id);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(401).send({
            mensaje: "Password Incorrecto"
          });
        }
      } else {
        res.status(404).send({
          mensaje: "No existe el usuario"
        });
      }
    } catch (error) {
      res.status(500).send({
        mensaje: "ocurrio un error",
        error
      });
    }
  }
};
