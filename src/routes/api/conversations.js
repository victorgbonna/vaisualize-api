const addConvo = require("../../controllers/conversations/addConvo");
const addConvoPlotsToVisuals = require("../../controllers/conversations/addConvoPlotsToVisuals");
const getConvoByAnalysis = require("../../controllers/conversations/getConvoByAnalysis");
const getProjectConversations = require("../../controllers/conversations/getProjectConversations");
const askProjectConversation = require("../../controllers/conversations/askProjectConversation");
const updateConvoContent = require("../../controllers/conversations/updateConvoContent");
const updateConversationContent = require("../../controllers/conversations/updateConversationContent");
const requireAuth = require("../../middleware/requireAuth");
const requireProjectAccess = require("../../middleware/requireProjectAccess");
const { addConvoSchema, addConvoPlotsToVisualsSchema, projectChatRequestSchema, updateConvoContentSchema, updateConversationContentSchema } = require("../../middleware/validators/conversations");
const askDatai = require("../../controllers/visuals/askDatai");
const { askDataiSchema } = require("../../middleware/validators/visual");

const router = require("express").Router();

router.post("/project/ask-datai", requireAuth, askDataiSchema, askDatai);
// router.post("/project/ask", requireAuth, projectChatRequestSchema, requireProjectAccess, askProjectConversation);
router.get("/project/:projectId", requireAuth, requireProjectAccess, getProjectConversations);
router.post("/send", addConvoSchema, addConvo); 
router.get("/get/:request_id", getConvoByAnalysis);
router.put("/add-to-visuals", addConvoPlotsToVisualsSchema, addConvoPlotsToVisuals);
// router.patch("/:messageId", updateConvoContentSchema, updateConvoContent);
router.patch("/update-content", updateConversationContentSchema, updateConversationContent);

//   SEND_
// CONVO:'chats/send',
//   GET_CONVO_BY_ID:(id)=>'chats/get/'+id,
//   ADD_CHAT_TO_VISUALS:'chats/add-to-visuals',
  
module.exports = router;