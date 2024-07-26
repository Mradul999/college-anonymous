import User from "../models/model.user.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator"

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
    const username =
      name.replace(/\s+/g, "").toLowerCase() +
      Math.floor(1000 + Math.random() * 9000);

    const hashedPass = bcryptjs.hashSync(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPass,
    });
    await user.save();
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
};

//generate otp

export const generateOTP = async (req, res) => {
  const { email } = req.body;

  if(!email.endsWith("@gla.ac.in")){
    return res.status(400).json({ message: "Enter a valid email" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User already registered",
    });
  }


  const otp=otpGenerator.generate(6,{
    digits: true,
    upperCase: false,
    specialChars: false,
    length: 6,
    alphabets: false,
  })
  
};
