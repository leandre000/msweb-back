export interface IUser {
  name: string;
  email: string;
  number: number;
  password: string;
  otp?: string;
  isResetVerified?: boolean;
  token?: string; // ✅ store JWT token if needed
}

export default IUser;
