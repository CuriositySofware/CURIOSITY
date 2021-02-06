const { Router } = require("express");
const { consult } = require("../controllers/consult");

const router = Router();

// Endpoint para consultar una query
router.post("/consult", consult);

module.exports = router;
