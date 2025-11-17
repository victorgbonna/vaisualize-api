const { FRONTEND_BASE_URL } = require("../../configs/constants");
const Payment = require("../../model/Payment");
const Request = require("../../model/Request");
const sendEmailToUser = require("../../utils/sendEmailToUser");


module.exports = async function (req, res, next) {
  try {
    const {email:email_attached, req_id}= req.body
    const payment=await Payment.findOne({email:email_attached})
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
    const reqs= payment.requests
    const reqIndex= reqs.findIndex(r=> r.req_id.toString() === req_id.toString())
    if(reqIndex === -1){
        return res.status(400).json({error: {
            message:"No request found with this id"
            }   
        });
    }   
    reqs[reqIndex].status="active"
    payment.requests= reqs
    await payment.save()
    const request = await Request.findOneAndUpdate({_id:req_id},{email_attached, status:"active"},{new:true})

    sendEmailToUser({
      mailTo:request.email_attached,
      subject:"Your vAIsualized Analysis is ready",
      tempPath: "public/views/paymentApproved.html",
      replacements: {
        nick_name:  payment.nick_name,
        gallery_link: `${FRONTEND_BASE_URL}/gallery/${payment._id}`
      },
        
    })
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", data:{payment, request}} );
  } catch (error) {
    next(error);
  }
};