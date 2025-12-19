const { MAIL_EMAIL } = require("../../configs/constants");
const Payment = require("../../model/Payment");
const Request = require("../../model/Request");
const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const {user_body, request_body, proof}= req.body
    
    const new_request={
      req_id: request_body._id, proof, access_code:request_body._id
    }
    const existing_pay=await Payment.findOne({req_id:request_body._id}).lean()
    if(existing_pay?.status==='pending'){
        return res.status(400).json({error: {
            message:"You already have a payment for this visual still currently pending"
            }   
        });
    }
    if(existing_pay?.status==='active'){
        return res.status(400).json({error: {
            message:"Payment is currently active"
            }   
        });
    }
    const payment= new Payment({...user_body, ...new_request})
    // sendemail to me so i can approve
    await payment.save();
    await Request.updateOne({_id:request_body._id},{status:'pending'})
    sendEmailToUser({
        mailTo:MAIL_EMAIL,
        subject:"New payment made",
        tempPath: "public/views/paymentNotification.html",
        replacements: {
            userEmail: user_body.email_attached,
            userName: user_body.fullName,
            whatsapp_line:user_body.whatsapp_line,
            requestId: request_body._id,
            receiptImageUrl: proof,
            receiptDocType: proof?.endsWith('.csv')?'doc':'img'
        } 
    })
    return res
      .status(200)
      .json({ status: "success", message:"Payment created", data:{payment}} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};