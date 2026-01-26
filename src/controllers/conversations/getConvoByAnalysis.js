const Conversation = require("../../model/Conversation");

module.exports = async function (req, res, next) {
  try {
    const {request_id}= req.params
    const conversations= await Conversation.find({analysis_id:request_id}).sort({createdAt:1})
    
    return res
      .status(200)
      .json({ status: "success", message:"Conversations gotten", conversations} );
  } catch (error) {
    next(error);
  }
};