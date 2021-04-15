const { Router } = require("express");
const {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
  createArtifact,
} = require("../controllers/consult");

const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);
router.get("/artifact/:id", getArtifactById);
router.get("/museums", getMuseums);
router.get("/museum", getArtifactByMuseum);
router.post("/create", createArtifact);

module.exports = router;
