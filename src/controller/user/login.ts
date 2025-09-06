// controller/user/Login.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const Login = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const user = (req as any).user; // ✅ from middleware

    // Check if user verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }
 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    } 

    return res.status(200).json({
      message: "Login successful", 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during login", error });
  }
};

export default Login;
