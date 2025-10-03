const Payment = require("../../model/Payment");
const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    const {user_id:_id}= req.params
    const payment=await Payment.findOne({_id, status:"active"}).lean()
    if(!payment){
        return res.status(400).json({error: {
            message:"No payment found"
            }   
        });
    }   
    const user_reqs= payment.requests
    const user_reqs_id= user_reqs.filter(({status})=>status==="active").map(({req_id})=>req_id)

    const requests= await Request.find({_id:{$in:user_reqs_id}}).sort({createdAt:-1})
    
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", requests} );
  } catch (error) {
    next(error);
  }
};