const Filter = require("../../model/Filter");
const Request = require("../../model/Request");

module.exports = async function (req, res, next) {
  try {
    const {req_id:_id, name, filters}= req.body
    // filter validation failed: filters.0.value: Path `value` is required., filters.0.filterOpt: Path `filterOpt` is required., filters.0.column: Path `column` is required.
    // console.log({_id, name, filters:filters[0][0], filters2:filters[0][1]})
    const request= await Request.findOne({_id, status:{$ne:"deleted"}})
    if(!request){
        return res.status(400).json({error:{message:'Request does not exists.'}})
    }
    const filter= await Filter.findOne({name, req_id:_id})
    if(filter){
      return res.status(200).json({error:{message:'Filter name already taken by you'}})
    }
    const new_filter = new Filter({name, filters, req_id:_id});
    await new_filter.save();
    
    await Request.updateOne({_id}, {active_filter:new_filter._id})
    return res
      .status(200)
      .json({ status: "success", message:"Filter added", active_filter:new_filter._id} );
  } catch (error) {
    next(error);
  }
};