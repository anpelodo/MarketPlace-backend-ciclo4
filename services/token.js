var jwt = require("jsonwebtoken");
const User = require("../models/user");

const encodeKey = process.env.ENCODE_KEY || "secretKeyToGenerateToken";

async function checkToken(token) {
  let __id = null;
  try {
    const { id } = await jwt.decode(token);
    __id = id;
  } catch (e) {
    return false;
  }
  const user = await User.findById(__id);
  if (user) {
    const token = jwt.sign(
      { id: __id, role: user.rol }, // Parametros que van asignados al token
      encodeKey, // Clave de encriptacion
      {
        expiresIn: "1d" // Tiempo de expiración
      }
    );
    return { token, rol: user.rol, id: user.id };
  } else {
    return false;
  }
}

module.exports = {
  //generar el token
  encode: async _id => {
    const token = jwt.sign({ id: _id }, encodeKey, {
      expiresIn: "1d"
    });
    return token;
  },
  //permite decodificar el token
  decode: async token => {
    try {
      const { id } = await jwt.verify(token, encodeKey);
      const user = await User.findById({ id });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  }
};
