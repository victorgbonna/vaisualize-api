const { modifyVisualSchema, addVisualSchema, addFiltersSchema, deleteVisualSchema, massUpdateOnVisualSchema, askDataiSchema } = require("../../middleware/validators/visual");
const addVisual = require("../../controllers/visuals/addVisual");
const deleteVisual = require("../../controllers/visuals/deleteVisual");
const editVisual = require("../../controllers/visuals/editVisual");
const addFilter = require("../../controllers/visuals/addFilter");
const editFilter = require("../../controllers/visuals/editFilter");
const getAllFilterByReqId = require("../../controllers/visuals/getAllFilterByReqId");
const resetFilter = require("../../controllers/visuals/resetFilter");
const massUpdateOnVisual = require("../../controllers/visuals/massUpdateOnVisual");
const askDatai = require("../../controllers/visuals/askDatai");

const router = require("express").Router();

router.post("/add", modifyVisualSchema, addVisual);
router.post("/edit",modifyVisualSchema, editVisual);
router.post("/delete", deleteVisualSchema, deleteVisual);
router.post("/filter/add",addFiltersSchema, addFilter);
router.post("/filter/edit", addFiltersSchema, editFilter);
router.post("/filter/reset",resetFilter);
router.get("/filter/get-all/:req_id",getAllFilterByReqId);
router.put("/mass-update",massUpdateOnVisualSchema,massUpdateOnVisual);
router.post("/ask-datai", askDataiSchema, askDatai);


module.exports = router;
