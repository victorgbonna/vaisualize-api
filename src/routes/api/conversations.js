const addConvo = require("../../controllers/conversations/addConvo");
const addConvoPlotsToVisuals = require("../../controllers/conversations/addConvoPlotsToVisuals");
const getConvoByAnalysis = require("../../controllers/conversations/getConvoByAnalysis");
const { addConvoSchema, addConvoPlotsToVisualsSchema } = require("../../middleware/validators/conversations");

const router = require("express").Router();

router.post("/send", addConvoSchema, addConvo); 
router.get("/get/:request_id", getConvoByAnalysis);
router.put("/add-to-visuals", addConvoPlotsToVisualsSchema, addConvoPlotsToVisuals);

//   SEND_
// CONVO:'chats/send',
//   GET_CONVO_BY_ID:(id)=>'chats/get/'+id,
//   ADD_CHAT_TO_VISUALS:'chats/add-to-visuals',
  
module.exports = router;