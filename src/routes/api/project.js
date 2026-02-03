const getProjectDraft = require("../../controllers/project/getProjectDraft");
const getProjectDrafts = require("../../controllers/project/getProjectDrafts");
const initializeProject = require("../../controllers/project/initializeProject");
const requireAuth = require("../../middleware/requireAuth");
const { initializeProjectSchema } = require("../../middleware/validators/project");

const router = require("express").Router();

router.post("/initialize", initializeProjectSchema, requireAuth, initializeProject); 
router.get("/draft/:id", requireAuth, getProjectDraft); 
router.get("/drafts/all", requireAuth, getProjectDrafts); 


module.exports = router;