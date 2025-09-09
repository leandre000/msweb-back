export interface IAuthUser {
  name: string;
  email: string;
  provider: "google" | "facebook" | "apple"; // ✅ sirf social providers
  googleId?: string;
  facebookId?: string;
  appleId?: string;
  token?: string; // JWT token
  createdAt?: Date;
  updatedAt?: Date;
}

export default IAuthUser;
