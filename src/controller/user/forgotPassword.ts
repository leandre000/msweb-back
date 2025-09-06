// controller/user/forgotPassword.ts
import { Request, Response } from "express";

const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { otp } = req.body;

    // Save OTP in DB for that user
    user.otp = otp;
    await user.save();

    return res.status(200).json({
      message: "OTP sent to your email for password reset"
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during forgot password", error });
  }
};

export default ForgotPassword;
