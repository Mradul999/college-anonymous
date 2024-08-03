import transporter from "../config/nodemailer.js";
export const sendMail = async (email, type, token) => {
  let subject, text;
  switch (type) {
    case "otp":
      (subject = "Register  using this OTP"), (text = `Your OTP is ${token}`);

      break;

    case "resetPassword":
      (subject = `Password Reset Instruction for College-anonymous account`),
        (text = `Copy the url  to your browser to reset your password for your College-anonymous account ${token}`);

      break;

    default:
      break;
  }
  const mailOptions = {
    from: "Anonymous",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Mail sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send Mail" };
  }
};
