// src/middleware/trimValue.ts
import { Request, Response, NextFunction } from "express";
import { processUserInput } from "../utils/userTransform";

const TrimValue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = processUserInput(req.body); // sanitize input
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error processing input", error });
  }
};

export default TrimValue;
