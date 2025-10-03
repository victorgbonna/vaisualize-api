const Request = require("../../../model/Request");

module.exports = async function (req, res, next) {
  try {
    const {email}= req.params
    const requests= await Request.find({email}).sort({createdAt:-1})
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", requests} );
  } catch (error) {
    next(error);
  }
};