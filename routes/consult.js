const { Router } = require("express");
const {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
  createArtifact,
  updateArtifact,
} = require("../controllers/consult");

const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);
router.get("/artifact/:id", getArtifactById);
router.get("/museums", getMuseums);
router.get("/museum", getArtifactByMuseum);
router.post("/create", createArtifact);
router.put("/update/:id", updateArtifact);

module.exports = router;
