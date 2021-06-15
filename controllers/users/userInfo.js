const { userData } = require("./utils");

const userInfo = async (req, res) => {
  const userInfo = await userData(req.user);

  if (!userInfo.ok) {
    return res.status(500).json({
      ok: false,
      message: userInfo.message,
    });
  }

  delete userInfo["password"];
  return res.status(200).json({
    ok: true,
    message: "Información de usuario encontrada",
    user: userInfo,
  });
};

module.exports = { userInfo };
