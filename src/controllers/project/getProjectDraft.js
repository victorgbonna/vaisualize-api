const ProjectDraft = require("../../model/ProjectDraft");


module.exports = async function (req, res, next) {
  try {
    const project= await ProjectDraft.findOne({_id:req.params.id, user_id:req.user._id})
    if(!project){
      return res.status(400).json({error:{message:'Project does not exist.'}})
    }
    return res
      .status(200)
      .json({ status: "success", message:"Project gotten", project} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};