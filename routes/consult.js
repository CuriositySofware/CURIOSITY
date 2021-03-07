const { Router } = require("express");
const { consult, getArtifactById } = require("../controllers/consult");

const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);
router.get("/consult/:id", getArtifactById);

module.exports = router;
