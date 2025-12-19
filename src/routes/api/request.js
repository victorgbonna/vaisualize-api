const addSuggestionToRequest = require("../../controllers/request/addSuggestionToRequest");
const getAllRequests = require("../../controllers/request/getAllRequests");
const getOneRequest = require("../../controllers/request/getOneRequest");
const promptAIVisuals = require("../../controllers/request/promptAIVisuals");
const saveRequest = require("../../controllers/request/saveRequest");
const validateAccesscode = require("../../controllers/request/validateAccesscode");
const { makeRequestSchema } = require("../../middleware/validators/request");

const router = require("express").Router();


router.post("/prompt-visuals", makeRequestSchema, promptAIVisuals); 
router.post("/save", saveRequest);
router.get("/get/all/:user_id", getAllRequests);
router.get("/get/all-public", getAllRequests);
router.get("/get/one/:id", getOneRequest);
router.post("/validate/:passcode", validateAccesscode);
router.post("/suggestions/add", addSuggestionToRequest);


module.exports = router;