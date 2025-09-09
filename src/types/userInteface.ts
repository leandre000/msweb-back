export interface IUser {
  name: string;
  email: string;
  number?: number;   // optional for OAuth users
  password?: string; // optional for OAuth users 
  otp?: string;
  isResetVerified?: boolean;
  token?: string; // JWT token
  createdAt?: Date; // 👈 auto-added by Mongoose
  updatedAt?: Date; // 👈 useful if you want last update time
}

export default IUser;
