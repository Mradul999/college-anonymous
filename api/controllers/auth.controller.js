import User from "../models/model.user.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";
import OTP from "../models/model.otp.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//user signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const username = "anonymous" + Math.floor(1000 + Math.random() * 9000);

    const hashedPass = bcryptjs.hashSync(password, 10);

    const user = new User({
      username,
      name,
      email,
      password: hashedPass,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "user signup successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
};

//generate otp and send it to user's email

export const generateOTP = async (req, res) => {
  const { email } = req.body;

  if (!email.endsWith("@gla.ac.in")) {
    return res.status(400).json({ message: "Enter a valid email" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User already registered",
    });
  }
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const newOtp = new OTP({
      email,
      otp,
    });
    await newOtp.save();

    const mailResponse = await sendMail(email, otp);
    if (mailResponse.success) {
      res.status(200).json({
        message: "OTP sent successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

//verifying otp

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDoc = await OTP.findOne({ email });
    if (!otpDoc) {
      return res.status(404).json({ message: "OTP not found" });
    }

    // console.log("otpDoc.otp=>", otpDoc.otp);
    // console.log("otp=>", otp);
    if (parseInt(otp) !== parseInt(otpDoc.otp)) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    res.status(200).json({
      success: true,
      message: "OTP successfully verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to verify OTP",
    });
  }
};

//user signin

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        message: "user signin successfully",
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};