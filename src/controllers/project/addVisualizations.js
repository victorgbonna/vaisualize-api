const Project = require("../../model/Project");

module.exports = async function (req, res, next) {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user._id,
      },
      {
        $push: {
          visualizations: {
            $each: req.body,
          },
        },
      },
      { new: true }
    ).lean();

    if (!project) {
      return res.status(404).json({
        error: {
          message: "Project does not exist or you do not have permission to access this project.",
        },
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Visualizations added",
      project,
    });
  } catch (error) {
    next(error);
  }
};