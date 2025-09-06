import { Request, Response } from "express"; 

const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const user = (req as any).user;

    if (!user.isResetVerified) {
      return res.status(403).json({ message: "OTP verification required" });
    }

    user.password = req.body.password;
    user.otp = undefined;
    user.isResetVerified = false;
     
    await user.save();
    return res.status(200).json({ 
      message: "Password reset successful", 
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during password reset", error });
  }
};

export default ResetPassword;
