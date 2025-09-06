import { Request, Response } from "express"; 
import User from "../../model/userSchema";

const Logout = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user; // middleware ne user attach kia hoga

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    // ✅ DB se token remove
    await User.findByIdAndUpdate(user._id, { $set: { token: null } });

    return res.status(200).json({
      message: "Logout successful. Token removed.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during logout", error });
  }
};

export default Logout;
