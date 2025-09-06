// controller/user/verifyResetOtp.ts
import { Request, Response } from "express";

const VerifyResetOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const user = (req as any).user;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark otp verified for reset purpose
    user.isResetVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified, you can now reset your password" });

  } catch (error) {
    return res.status(500).json({ message: "Server error during OTP verification", error });
  }
};

export default VerifyResetOtp;
