const getAllPublicProjects = require("../../controllers/project/getAllPublicProjects");

const createProject = require("../../controllers/project/createProject");
const getProjectDraft = require("../../controllers/project/getProjectDraft");
const getProjectDrafts = require("../../controllers/project/getProjectDrafts");
const initializeProject = require("../../controllers/project/initializeProject");
const requireAuth = require("../../middleware/requireAuth");
const { initializeProjectSchema, createProjectRequestSchema } = require("../../middleware/validators/project");

const getAllOwnedCreatedProject = require("../../controllers/project/owned_projects/getAllOwnedCreatedProject");
const getOwnedCreatedPoject = require("../../controllers/project/owned_projects/getOwnedCreatedPoject");
const getAllSharedProjects = require("../../controllers/project/shared_projects/getAllSharedProjects");
const getSharedProjectById = require("../../controllers/project/shared_projects/getSharedProjectById");

const router = require("express").Router();

router.post("/initialize", requireAuth, initializeProjectSchema, initializeProject);
router.post("/finalize", requireAuth, createProjectRequestSchema, createProject);
router.get("/draft/:id", requireAuth, getProjectDraft); 
router.get("/drafts-all", requireAuth, getProjectDrafts); 

// Owned projects
router.get("/owned-all", requireAuth, getAllOwnedCreatedProject);
router.get("/owned/:id", requireAuth, getOwnedCreatedPoject);

// Shared projects
router.get("/shared-all", requireAuth, getAllSharedProjects);
router.get("/shared/:id", requireAuth, getSharedProjectById);

// Public projects
router.get("/public", getAllPublicProjects);


module.exports = router;