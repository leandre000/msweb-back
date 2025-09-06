import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
const generateOtp=async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const otp=crypto.randomInt(100000, 999999).toString();
        req.body.otp=otp;
        req.body.isVerified=false;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error generating OTP", error });
    }
}
export default generateOtp;