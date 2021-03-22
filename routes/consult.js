const { Router } = require("express");
const {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
} = require("../controllers/consult");

const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);
router.get("/consult/:id", getArtifactById);
router.get("/museums", getMuseums);
router.get("/artifacts", getArtifactByMuseum);

module.exports = router;
