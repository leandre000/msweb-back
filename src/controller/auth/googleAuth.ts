// controller/auth/googleAuth.ts
import { Request, Response } from "express";
import AuthSchema from "../../model/authSchema";
import { generateToken } from "../../utils/jwtUtils";

export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.redirect("http://localhost:3001/login?error=unauthorized");
    }

    const profile = req.user as Express.User;

    // Check if user exists
    let user = await AuthSchema.findOne({ email: profile.emails?.[0]?.value });
    if (!user) {
      user = new AuthSchema({
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        googleId: profile.id,
        provider: "google",
      });
      await user.save();
    }

    // Generate JWT (do NOT store in DB)
    const token = generateToken({ id: user._id, email: user.email });

    // ✅ Redirect frontend to /home with token
    res.redirect(`http://localhost:3001/?token=${token}`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
