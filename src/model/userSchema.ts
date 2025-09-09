import mongoose, { Schema } from "mongoose";
import IUser from "../types/userInteface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: false },
    password: { type: String, required: true }, // OAuth users won't have password
    otp: { type: String, default: null },
    isResetVerified: { type: Boolean, default: false },
    token: { type: String, default: null }
  },
  { timestamps: true } // 👈 This automatically adds createdAt & updatedAt
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
