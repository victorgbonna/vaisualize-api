const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    const {id:_id, filters}= req.body
    const request= await Request.findOne({_id, status:{$ne:"deleted"},email_attached:{$ne:null}})
    if(!request){
        return res.status(400).json({error:{message:'Request does not exists.'}})
    }
    await Request.updateOne({_id}, {filters})
    return res
      .status(200)
      .json({ status: "success", message:"Filter added"} );
  } catch (error) {
    next(error);
  }
};