const { Router } = require("express");
const {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
  createArtifact,
  updateArtifact,
} = require("../controllers/consult");
const { getImage } = require("../controllers/uploads");
const {registerUser} = require('../controllers/users/register');
const {encryptPassword} = require('../controllers/middleware/password');


const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);
router.get("/artifact/:id", getArtifactById);
router.get("/museums", getMuseums);
router.get("/museum", getArtifactByMuseum);
router.post("/create", createArtifact);
router.put("/update/:id", updateArtifact);
router.get("/image/:id", getImage);
router.post("/users/new_user",encryptPassword, registerUser)

module.exports = router;
