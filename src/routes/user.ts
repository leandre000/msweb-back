import { Router } from "express";
import SignUp from "../controller/user/signUp";
import findOneEmail from "../middleware/findEmail";
import hashedPassword from "../middleware/hashedPassword";
import generateOtp from "../middleware/otp"; 
import SendOtpEmail from "../middleware/sendOtpEmail";
import findUser from "../middleware/findUser";
import Login from "../controller/user/login";
import TrimValue from "../middleware/trimValue";
import VerifyOtp from "../controller/user/verifyOtp";
import VerifyResetOtp from "../controller/user/verifyResetOtp";
import ResetPassword from "../controller/user/resetPassword";
import ForgotPassword from "../controller/user/forgotPassword";

const router = Router();

// Auth
router.post("/signup", TrimValue, findOneEmail, hashedPassword, generateOtp, SendOtpEmail, SignUp);
router.post("/verify-otp", findUser, VerifyOtp);
router.post("/login", findUser, Login);

// Forgot Password
router.post("/forgot-password", findUser, generateOtp, SendOtpEmail, ForgotPassword);
router.post("/verify-reset-otp", findUser, VerifyResetOtp);
router.post("/reset-password", findUser, hashedPassword, ResetPassword);
export default router;