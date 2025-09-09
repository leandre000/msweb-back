import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import googleAuthRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// 🔹 Extend Express.User for type safety
declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      emails?: { value: string }[];
    }
  }
}

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport Google Strategy with type safety
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User | false) => void
    ) => {
      const user: Express.User = {
        id: profile.id,
        displayName: profile.displayName,
        emails: profile.emails ?? [],
      };
      return done(null, user);
    }
  )
);

// ✅ Serialize / Deserialize
passport.serializeUser<Express.User>((user, done) => {
  done(null, user);
});

passport.deserializeUser<Express.User>((user, done) => {
  done(null, user);
});
 
// ✅ Config
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/defaultDB";

const API_BASE = process.env.API_BASE || "/api";

// ✅ User API routes
app.use(`${API_BASE}/users`, userRoutes);
app.use(`${API_BASE}/auth`, googleAuthRoutes);

// ✅ MongoDB Connection + Server Start
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${API_BASE}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
