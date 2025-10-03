const { MAIL_EMAIL } = require("../../configs/constants");
const Payment = require("../../model/Payment");
const Request = require("../../model/Request");
const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const {user_body, request_body, proof}= req.body
    const request = new Request({...request_body});
    await request.save();
    const new_request={
      req_id: request._id, proof
    }
    const payment= await Payment.findOneAndUpdate(
      { email: user_body.email },
      { $push: { requests: new_request } },
      { upsert: true, new: true }
    );
    // sendemail to me so i can approve
    sendEmailToUser({
        mailTo:MAIL_EMAIL,
        subject:"New payment made",
        tempPath: "public/views/paymentNotification.html",
        replacements: {
            userEmail: user_body.email,
            userName: user_body.nick_name,
            requestId: request._id,
            receiptImageUrl: proof
        } 
    })
    return res
      .status(200)
      .json({ status: "success", message:"Payment created", data:{payment,request}} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};