const Payment = require("../../model/Payment");


module.exports = async function (req, res, next) {
  try {
    const {email:email_attached}= req.params
    const payment=await Payment.findOne({email_attached})
    if(!payment){
        return res.status(400).json({error: {
            message:"No payment found for this email"
            }   
        });
    }   
    if(payment.status !== "active"){
        return res.status(400).json({error: {
            message:"Your payment status is not active"
            }   
        });
    }   

    return res
      .status(200)
      .json({ status: "success", message:"Payment gotten"} );
  } catch (error) {
    next(error);
  }
};