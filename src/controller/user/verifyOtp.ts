import { Request, Response } from "express";
import { generateToken } from "../../utils/jwtUtils";
import User from "../../model/userSchema";

const VerifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const user = (req as any).user;

    if (!otp) return res.status(400).json({ message: "OTP is required" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    user.otp = undefined;
    // ✅ Generate JWT token
    const token = generateToken({ userId: user._id });

    // Save token in DB
    user.token = token;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      token, // ✅ response me token send hoga
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during OTP verification", error });
  }
};

export default VerifyOtp;
