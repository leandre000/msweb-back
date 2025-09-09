import { Router } from "express";
import passport from "passport";
import { googleAuthCallback } from "../controller/auth/googleAuth";


const router = Router();

// Step 1: Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleAuthCallback
);

export default router;