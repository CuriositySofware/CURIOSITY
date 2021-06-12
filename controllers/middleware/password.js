const bcrypt = require("bcrypt");

const encryptPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      ok: false,
      message: "La contraseña es requerida",
    });
  }
  const salt = await bcrypt.genSalt(10);

  const encrypted_password = await bcrypt.hash(password, salt);
  req.body.password = encrypted_password;
  //Pass control to main function
  next();
};

module.exports = { encryptPassword };
