const Project = require("../../../model/Project");

module.exports = async function (req, res, next) {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user_id: req.user._id
    }).populate("datasets", "file_name file_size file_url total_rows columns first_five_rows proj_title").lean();
    if (!project) {
      return res.status(404).json({ error: { message: "Project does not exist or you do not have permission to access this project." } });
    }
    return res.status(200).json({ status: "success", message: "Project fetched", project });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};