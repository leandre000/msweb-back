import { NextFunction, Request, Response } from "express";
import User from "../model/userSchema";

const findOneEmail=async(req: Request, res:Response, next:NextFunction)=>{
    try {
        const {email}=req.body;
         if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const existingUser=await User.findOne({email});
     if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }
    next();
    } catch (error) {
        return res.status(500).json({ message: "Server error while checking email", error });
    }
}
export default findOneEmail;