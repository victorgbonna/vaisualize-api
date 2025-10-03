const Request = require("../../model/Request");
// const sendEmailToUser = require("../../utils/sendEmailToUser");

module.exports = async function (req, res, next) {
  try {
    const {_id, suggestion}= req.body
    const request = await Request.findOne({_id})
    if(!request){
        return res.status(400).json({error: { 
            message:"No request" 
          }
        }); 
    }

    await Request.updateOne({_id},{$push:{suggestions:suggestion}})

    // sendemail({
    //     "send "
    // })
    return res
      .status(200)
      .json({ status: "success", message:"Request updated"} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};