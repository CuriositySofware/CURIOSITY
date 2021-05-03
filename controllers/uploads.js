const { response } = require("express");
const path = require("path");

const getImage = async (req, res = response) => {
  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};

module.exports = {
  getImage,
};
