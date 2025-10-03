const Request = require("../../model/Request");
const {generateVisualizationPlan} = require("../../services/chatGPTServices")
    
// const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const request = new Request({...req.body});
    await request.save();

    const visuals_sugg= await generateVisualizationPlan(req.body)
    
    return res
      .status(200)
      .json({ status: "success", message:"Request created", data:{request, visuals_sugg}} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};