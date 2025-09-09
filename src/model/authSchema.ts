import mongoose, { Schema } from "mongoose";
import IAuthUser from "../types/authInterface";

const authSchema = new Schema<IAuthUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    provider: {
      type: String,
      enum: ["google", "facebook", "apple"], // ✅ sirf OAuth providers
      required: true,
    },

    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    appleId: { type: String, unique: true, sparse: true },

    token: { type: String, default: null },
  },
  { timestamps: true }
);

const AuthUser = mongoose.model<IAuthUser>("AuthUser", authSchema);
export default AuthUser;
