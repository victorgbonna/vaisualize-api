const Request = require("../../../model/Request");

module.exports = async function (req, res, next) {
  try {
    const requests= await Request.find({$ne:{email:null}}).sort({createdAt:-1})
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", requests} );
  } catch (error) {
    next(error);
  }
};