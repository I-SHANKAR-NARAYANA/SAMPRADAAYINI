const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema(
  {
    email: { type: String, unique: true },
    otp: { type: String },
    createdAt: { type: Date },
    expiresAt: { type: Date },
  },
  { collection: "otp-data" }
);

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
