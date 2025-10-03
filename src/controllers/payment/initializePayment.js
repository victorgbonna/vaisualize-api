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
    const payment= new Payment({...user_body, requests:[new_request]})
    // sendemail to me so i can approve
    await payment.save();

    sendEmailToUser({
      mailTo:MAIL_EMAIL,
      subject:"New payment made",
      text:`A new payment has been made by ${user_body.nick_name}, email: ${user_body.email}. Please check the admin panel to approve the request. Request id: ${request._id}`
    })
    return res
      .status(200)
      .json({ status: "success", message:"Request created", data:{payment,request}} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};