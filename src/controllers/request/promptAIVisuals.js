const Request = require("../../model/Request");
const {generateVisualizationPlan} = require("../../services/chatGPTServices")
    
// const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const visuals_sugg= await generateVisualizationPlan(req.body)
    
    // nest explicitly so the saved doc always has `visuals_obj`, regardless of the raw GPT output shape
    const request = new Request(
      {...req.body, visuals_obj: visuals_sugg}
    );
    // {...req.body, chatGPT_response: [visuals_sugg]}

    await request.save();

    return res
      .status(200)
      .json(
        { 
          status: "success", message:"Request created", 
          data:{_id:request._id}
        } );
  } catch (error) {
    console.log({error})
    next(error);
  }
};