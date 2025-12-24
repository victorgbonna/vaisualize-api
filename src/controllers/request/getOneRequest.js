const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    const {id:_id}= req.params 
    const request= await Request.findOne({_id, mode:'public'})
    if(!request){
      return res.status(400).json({error:{message:'Visuals not found'}})
    }
    if(request.status==='deleted'){
      return res.status(400).json({error:{message:'Visuals not found'}})
    }
    return res
      .status(200)
      .json({ status: "success", message:"Request gotten", request} );
  } catch (error) {
    next(error);
  }
};