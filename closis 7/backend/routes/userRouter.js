import express from "express";
import {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  getProfile,
  deleteProfile,
} from "../controllers/userController.js";
import { requireAuth, optionalAuth } from "../middleware/requireAuth.js";

const router = express.Router();


router.post("/signup", signupUser); 
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password/:token", resetPassword); 


router.get("/me", optionalAuth, getMe);


router.get("/profile", requireAuth, getProfile);
router.delete("/profile", requireAuth, deleteProfile); 

export default router;
