const ProjectDraft = require("../../model/ProjectDraft");
const mongoose = require("mongoose");

module.exports = async function (req, res, next) {
  try {
    const project = await ProjectDraft.findOne({
      _id: req.params.id,
    }).lean();
    // console.log({project_user_id: project?.user_id.toString(), req_user_id:req.user._id.toString()})
    if(project.user_id.toString() !== req.user._id.toString()){
      return res.status(403).json({error:{message:'You do not have permission to access this project.'}})
    }
    if(!project){
      return res.status(400).json({error:{message:'Project does not exist.'}})
    }
    return res
      .status(200)
      .json({ status:  "success", message:"Project gotten", project} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};