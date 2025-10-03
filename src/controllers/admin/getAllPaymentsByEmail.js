const Payment = require("../../model/Payment");

module.exports = async function (req, res, next) {
  try {
    const {email}= req.params
    const payments= await Payment.find({email}).sort({createdAt:-1})
    return res
      .status(200)
      .json({ status: "success", message:"Payment gotten", payments} );
  } catch (error) {
    next(error);
  }
};