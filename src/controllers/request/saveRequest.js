const Request = require("../../model/Request");
// const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const request = new Request({...req.body});
    await request.save();
    
    return res
      .status(200)
      .json({ status: "success", message:"Request created", request} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};