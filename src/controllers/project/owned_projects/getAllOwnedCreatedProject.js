const Project = require("../../../model/Project");

module.exports = async function (req, res, next) {
	try {
		const projects = await Project.find({
			user_id: req.user._id
    	}).populate("datasets", "file_name file_size total_rows columns first_five_rows proj_title").lean();
		return res.status(200).json({ status: "success", message: "Owned projects fetched", projects });
	} catch (error) {
		console.log({ error });
		next(error);
	}
};
