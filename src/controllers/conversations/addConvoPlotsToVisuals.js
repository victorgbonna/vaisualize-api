const Conversation = require("../../model/Conversation");
const Request = require("../../model/Request");

module.exports = async function (req, res, next) {
  try {
    const {analysis_id, visuals, chat_id:_id}= req.body
    const request= await Request.findOne({_id:analysis_id, status:{$ne:"deleted"}})
    if(!request){
      return res.status(400).json({error:{message:'Request does not exists.'}})
    }
    let old_charts=request.visuals_obj.visuals
    let new_charts= [...old_charts, ...visuals]
    await Request.updateOne({_id}, {visuals_obj:{...request.visuals_obj, visuals:new_charts}})
    await Conversation.updateOne({_id},{status:'applied'})
    return res
      .status(200)
      .json({ status: "success", message:"Conversations added"});
  } catch (error) {
    console.log({error})
    next(error);
  }
};