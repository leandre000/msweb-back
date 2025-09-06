import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (payload: object): string => {
  const secretKey: string = process.env.JWT_SECRET || "yourSuperSecretKey"; 

  const options: SignOptions = {
    expiresIn: "1h" // ✅ string allowed in SignOptions (e.g., "1h", "7d")
  };

  return jwt.sign(payload, secretKey, options);
};
