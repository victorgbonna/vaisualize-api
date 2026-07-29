const Aisa = require("../../model/Aisa");
const sendEmailToUser = require("../../utils/sendEmailToUser");

const ACCESS_LINK =
  "https://drive.google.com/file/d/18DDTuPr5qvgZ9b3EiFowG6o2zBi-Mlij/view?usp=drive_link";

module.exports = async function grantAisa(req, res, next) {
  try {
    // Claim the request before sending so the cron job cannot send it twice.
    const aisa = await Aisa.findOneAndUpdate(
      { _id: req.params.id, status: "entered" },
      { status: "used" },
      { new: true }
    );

    if (!aisa) {
      return res.status(404).json({
        status: "error",
        message: "This request was not found or has already been processed.",
      });
    }

    const emailResult = await sendEmailToUser({
      tempPath: "public/views/aisaAccessGranted.html",
      replacements: { accessLink: ACCESS_LINK },
      mailTo: aisa.email,
      subject: "Your access has been granted",
    });

    if (emailResult && emailResult.error) {
      await Aisa.findByIdAndUpdate(aisa._id, { status: "granted" });
      return res.status(502).json({
        status: "error",
        message: "Access was granted, but the email could not be sent. It will be retried shortly.",
      });
    }

    await Aisa.findByIdAndUpdate(aisa._id, { status: "sent" });

    return res.status(200).json({
      status: "success",
      message: `Access has been granted and an email was sent to ${aisa.email}.`,
    });
  } catch (error) {
    next(error);
  }
};
