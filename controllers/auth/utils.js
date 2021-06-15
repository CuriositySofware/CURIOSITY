const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createUserToken = (id, res) => {
  const token = signToken(id);

  //set expiry to 1 month
  let d = new Date();
  d.setDate(d.getDate() + 30);

  //cookie settings
  /*   res.cookie("jwt", token, {
    expires: d,
    httpOnly: true,
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: "none",
  }); */

  return token;
};
