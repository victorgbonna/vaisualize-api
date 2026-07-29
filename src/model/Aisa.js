const mongoose = require("mongoose");

const AisaSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["sent", "entered", "used", "granted"],
      default: "entered",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("aisa", AisaSchema);
