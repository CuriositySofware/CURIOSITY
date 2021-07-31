const { Router } = require("express");
const {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
  createArtifact,
  updateArtifact,
  updateMuseum,
  getUserInfo,
} = require("../controllers/consult");
const {
  getImage,
  getMuseumImages,
  getSingleMuseumImage,
} = require("../controllers/uploads");
const { registerUser } = require("../controllers/users/register");
const { loginUser } = require("../controllers/users/login");
const { userInfo, userEdit } = require("../controllers/users/userInfo");
const { encryptPassword } = require("../controllers/middleware/password");
const { verifyToken } = require("../controllers/middleware/verify_token");

const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);
router.get("/artifact/:id", getArtifactById);
router.get("/museums", getMuseums);
router.get("/museum", getArtifactByMuseum);
router.post("/create", verifyToken, createArtifact);
router.put("/update/:id", verifyToken, updateArtifact);
router.put("/museum/update/:id", verifyToken, updateMuseum);
router.get("/image/:id", getImage);
router.get("/image/museums/:id", getMuseumImages);
router.post("/users/new_user", encryptPassword, registerUser);
router.post("/users/login", loginUser);
router.get("/users/user_info", verifyToken, userInfo);
router.put("/users/update/:email", verifyToken, userEdit);

module.exports = router;
