const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "El token es requerido",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        message: err.toString(),
      });
    }
    req.user = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
