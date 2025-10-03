const Payment = require("../../model/Payment");
const Request = require("../../model/Request");
// const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const payment = await Payment.findOne({access_code: req.body.access_code, email:req.body.email});
    if(!payment){
        return res.status(400).json({error: {
                message:"Invalid Access code",
            }       
        });
    }
    
    return res
      .status(200)
      .json({ status: "success", message:"Payment created", payment} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};