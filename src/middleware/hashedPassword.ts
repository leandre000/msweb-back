// middleware/hashedPassword.ts
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

const hashedPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.password) {
  const hash = await bcrypt.hash(req.body.password, 10); 
  req.body.password = hash; 
}
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error hashing password", error });
  }
};

export default hashedPassword;
