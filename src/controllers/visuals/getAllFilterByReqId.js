const Filter = require("../../model/Filter");

module.exports = async function (req, res, next) {
  try {
    const {req_id}= req.params
    const filters= await Filter.find({req_id}).sort({createdAt:-1})
    // const get_req= await Request.findOne({_id:req_id}).lean()
    return res
      .status(200)
      .json({ 
        status: "success", message:"Request gotten", data:{filters}} );
  } catch (error) {
    next(error);
  }
};