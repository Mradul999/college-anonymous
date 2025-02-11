import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10,
  },
},{ timestamps: true });

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
