import { Request, Response } from "express"; 
import User from "../../model/userSchema"; 
const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, number, password, otp, isVerified } = req.body;

    if (!name || !email || !number || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({
      name,
      email,
      number,
      password,
      otp,
      isVerified,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered. Please verify OTP sent to email." });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export default SignUp;
