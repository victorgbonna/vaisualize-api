const Aisa = require("../model/Aisa");
const sendEmailToUser = require("../utils/sendEmailToUser");

const ACCESS_LINK =
  "https://drive.google.com/file/d/18DDTuPr5qvgZ9b3EiFowG6o2zBi-Mlij/view?usp=drive_link";

module.exports = async function sendGrantedAisaEmails() {
  let sentCount = 0;
  const failedIds = [];

  // Claim one record at a time. Changing it to `used` prevents another cron
  // invocation (or another app instance) from sending the same email.
  while (true) {
    const aisa = await Aisa.findOneAndUpdate(
      {
        status: "granted",
        email: { $exists: true, $ne: "" },
        _id: { $nin: failedIds },
      },
      { status: "used" },
      { new: true }
    );

    if (!aisa) break;

    try {
      const result = await sendEmailToUser({
        mailTo: aisa.email,
        subject: "Your access has been granted",
        tempPath: "public/views/aisaAccessGranted.html",
        replacements: { accessLink: ACCESS_LINK },
      });

      if (result && result.error) {
        throw new Error("Email provider did not accept the message");
      }

      await Aisa.findByIdAndUpdate(aisa._id, { status: "sent" });
      sentCount += 1;
    } catch (error) {
      // Put failed messages back in the queue so a later run can retry them.
      await Aisa.findByIdAndUpdate(aisa._id, { status: "granted" });
      failedIds.push(aisa._id);
      console.error(`Failed to send granted access email to ${aisa.email}:`, error);
    }
  }

  return sentCount;
};
