import { NextFunction, Request, Response } from "express"; 
import User from "../model/userSchema";

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error while finding user", error });
  }
};

export default findUser;
