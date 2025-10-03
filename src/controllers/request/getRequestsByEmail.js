const Payment = require("../../model/Payment");
const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    const {email:email_attached}= req.params
    const payment=await Payment.findOne({email_attached, status:"active"})
    if(!payment){
        return res.status(400).json({error: {
            message:"No payment found for this email"
            }   
        });
    }   
    const requests= await Request.find({email_attached}).sort({createdAt:-1})
    
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", requests} );
  } catch (error) {
    next(error);
  }
};