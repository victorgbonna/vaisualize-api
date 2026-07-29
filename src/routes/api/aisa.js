const router = require("express").Router();
const createAisa = require("../../controllers/aisa/createAisa");
const grantAisa = require("../../controllers/aisa/grantAisa");
const { createAisaSchema } = require("../../middleware/validators/aisa");

router.post("/", createAisaSchema, createAisa);
router.get("/:id/grant", grantAisa);

module.exports = router;
