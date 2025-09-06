import { Request, Response } from "express";

const VerifyOtp = async (req: Request, res: Response) => {
    try {
        const {otp} = req.body;
        const user = (req as any).user;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
    return res.status(500).json({ message: "Server error during OTP verification", error });
    }
}

export default VerifyOtp;