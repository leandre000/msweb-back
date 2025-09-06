import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwtUtils"; // ✅ import sahi tarah
import User from "../../model/userSchema";

const Login = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const user = (req as any).user;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT token
    const token = generateToken({ userId: user._id });

    // Optionally save token in DB
    user.token = token;
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      token, // ✅ response me token send hoga
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during login", error });
  }
};

export default Login;
