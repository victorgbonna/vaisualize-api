const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    const {id:_id}= req.params 
    const requests= await Request.findOne({_id})
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", requests} );
  } catch (error) {
    next(error);
  }
};