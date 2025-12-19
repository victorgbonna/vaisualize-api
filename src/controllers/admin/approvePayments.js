const { FRONTEND_BASE_URL } = require("../../configs/constants");
const Payment = require("../../model/Payment");
const Request = require("../../model/Request");
const sendEmailToUser = require("../../utils/sendEmailToUser");


module.exports = async function (req, res, next) {
  try {
    const {pay_id:_id, password, status}= req.body
    
    if(password !== process.env.ACCESS_PASSWORD){
        return res.status(400).json({error: {
            message:"Invalid Payment"
            }   
        });
    }
    const payment=await Payment.findOne({_id}).lean()
    if(!payment){
        return res.status(400).json({error: {
            message:"No payment found for this email"
            }   
        });
    }   
    if(payment.status === "active"){
        return res.status(400).json({error: {
            message:"It has already been approved"
            }   
        });
    }   
    
    let new_status= status || 'rejected'
    await Payment.updateOne({_id},{status:new_status})
    const request = await Request.findOneAndUpdate({_id:payment.req_id},{status:status || 'break'},{new:true})

    if(status=='active'){
      sendEmailToUser({
        mailTo:payment.email_attached,
        subject:"It is now permanent!",
        tempPath: "public/views/paymentApproved.html",
        replacements: {
          fullName:  payment?.fullName,
          gallery_link: `${FRONTEND_BASE_URL}/analysis/${payment._id}`
        },     
      })
    }
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", data:{payment}} );
  } catch (error) {
    next(error);
  }
};