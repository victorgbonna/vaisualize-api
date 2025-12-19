const Request = require("../../model/Request");


module.exports = async function (req, res, next) {
  try {
    // mainId:router?.query?.id, chartInd:ind
    const {mainId:_id, chartInd}= req.body
    const request= await Request.findOne({_id, status:{$ne:"deleted"}})
    if(!request){
        return res.status(400).json({error:{message:'Request does not exists.'}})
    }
    let old_charts=request.visuals_obj.visuals
    old_charts.splice(chartInd, 1)
    await Request.updateOne({_id}, {visuals_obj:{...request.visuals_obj, visuals:old_charts}})
    return res
      .status(200)
      .json({ status: "success", message:"Visual deleted"} );
  } catch (error) {
    next(error);
  }
};