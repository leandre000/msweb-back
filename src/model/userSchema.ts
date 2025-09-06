import mongoose, { Schema } from "mongoose";
import IUser from "../types/userInteface";

const userSchema= new Schema<IUser>({
    name:{type: String, required: true},
    email:{type: String, required: true},
    number:{type: Number, required:true},
    password:{type: String, required:true},
     otp: { type: String, default: null },
  isVerified: { type: Boolean, default: false }, 
  isResetVerified: { type: Boolean, default: false },
})
const User=mongoose.model<IUser>("User", userSchema);
export default User;