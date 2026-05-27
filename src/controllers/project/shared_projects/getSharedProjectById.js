const Project = require("../../../model/Project");

module.exports = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [
        { mode: 'public' },
        { shared_guest_with: userId },
        { shared_edited_with: userId }
      ]
    }).lean();
    if (!project) {
      return res.status(404).json({ error: { message: "Project does not exist or you do not have permission to access this project." } });
    }
    return res.status(200).json({ status: "success", message: "Shared project fetched", project });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
