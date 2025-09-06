import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";

const SendOtpEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body; // ✅ Extract from request body

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ✅ stored in .env
        pass: process.env.EMAIL_PASS, // ✅ App Password from Gmail
      },
    });

  await transporter.sendMail({
  from: `"No Reply" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🔐 Your OTP Code - Secure Verification",
  html: `
    <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
      <h2 style="color:#4CAF50;">Hello 👋,</h2>
      <p>You requested to verify your account. Please use the following OTP code:</p>
      
      <div style="margin:20px 0; text-align:center;">
        <span style="
          font-size:28px; 
          font-weight:bold; 
          color:#ffffff; 
          background:#4CAF50; 
          padding:10px 20px; 
          border-radius:8px;
          letter-spacing:4px;
          display:inline-block;">
          ${otp}
        </span>
      </div>

      <p style="color:#666;">⚠️ This OTP will expire in <b>10 minutes</b>. Do not share it with anyone.</p>

      <p style="margin-top:30px;">Regards,<br><b>Your App Team</b></p>
    </div>
  `,
});

    next(); // ✅ Pass control to next middleware/controller
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return res.status(500).json({ message: "Failed to send OTP email." });
  }
};

export default SendOtpEmail;
