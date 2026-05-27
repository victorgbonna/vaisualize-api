const Project = require("../../../model/Project");

module.exports = async function (req, res, next) {
	try {
		const projects = await Project.find({
			user_id: req.user._id
		}).lean();
		return res.status(200).json({ status: "success", message: "Owned projects fetched", projects });
	} catch (error) {
		console.log({ error });
		next(error);
	}
};
