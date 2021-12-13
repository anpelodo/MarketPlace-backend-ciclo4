const jwt = require('../services/token');

module.exports = {
  verifyAdmin: async (req, res, next) => {
    try {
      if (req.headers.token) {
        const token = req.headers.token;

        //Verificando el token
        const jwtResponse = await jwt.decode(token);
        if (jwtResponse.rol == 'ADMIN') {
          next();
        } else {
          return res.status(401).json({
            mensaje: 'No autorizado',
          });
        }
      } else {
        return res.status(404).json({
          mensaje: 'No hay token',
        });
      }
    } catch (error) {
      res.status(500).json({
        mensaje: 'Hubo un error',
        error,
      });
    }
  },

  verifyOwner: async (req, res, next) => {
    try {
      if (req.headers.token) {
        const token = req.headers.token;

        //Verificando el token
        const jwtResponse = await jwt.decode(token);
        if (jwtResponse) {
          const _id = req.params.id;
          // Verificando que el usuario que hace la peticion
          // sea al mismo al que se le hará la modificacion.
          if (_id === jwtResponse.id || jwtResponse.rol === 'ADMIN') {
            return next();
          }
        }

        return res.status(401).json({
          mensaje: 'No autorizado',
        });
      } else {
        return res.status(404).json({
          mensaje: 'No hay token',
        });
      }
    } catch (error) {
      res.status(500).json({
        mensaje: 'Hubo un error',
        error,
      });
    }
  },
};
