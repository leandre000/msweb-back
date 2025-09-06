import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; 
import User from "../model/userSchema";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secretKey: string = process.env.JWT_SECRET || "yourSuperSecretKey";

    const decoded = jwt.verify(token, secretKey) as { userId: string };

    // ✅ user find from DB and attach to req
    const user = await User.findOne({ _id: decoded.userId, token });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token", error });
  }
};

export default authMiddleware;
