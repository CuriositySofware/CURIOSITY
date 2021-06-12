const { userData, comparePassword } = require("./utils");
const AuthUtils = require("../auth/utils");


const loginUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      ok: false,
      message: "No se encontro cuerpo de la consulta",
    });
  }
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      ok: false,
      message: "Todos los campos son necesarios",
    });
  }
  
  const { email, password } = req.body;
  // const id_user = email.replace("@", "");

  const userInfo = await userData(email);

  if (!userInfo.ok) {
    return res.status(500).json({
      ok: false,
      message: userInfo.message,
    });
  }
  const correctPass = await comparePassword(userInfo.password, password);
  if (correctPass) {
    const token = AuthUtils.createUserToken(email, res);
    delete userInfo["password"];
    return res.status(200).json({
      ok: true,
      message: "Sesión iniciada correctamente",
      user: userInfo,
      token,
    });
  }

  return res.status(401).json({
    ok: false,
    message: "La clave es inválida",
  });
};

module.exports = { loginUser };
