const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    const {id:_id}= req.body
    const request= await Request.findOne({_id, status:{$ne:"deleted"}})
    if(!request){
        return res.status(400).json({error:{message:'Request does not exists.'}})
    }
    await Request.updateOne({_id}, {active_filter:null})
    return res
      .status(200)
      .json({ status: "success", message:"Filter added"} );
  } catch (error) {
    next(error);
  }
};