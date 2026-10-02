import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Outfit from "../models/outfitModel.js";

// helper: make a JWT that holds the user id, valid for 3 days
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// helper: what the frontend saves in localStorage("user")

const userResponse = (user, token) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  };
};

// POST /api/users/signup   
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
   
    const user = await User.signup(name, email, password);

   
    const token = createToken(user._id);

    res.status(201).json(userResponse(user, token));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/users/login   
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.login(email, password);

    
    const token = createToken(user._id);

    res.status(200).json(userResponse(user, token));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/users/forgot-password   body: { email }
// There is no email service yet, so the reset link is printed in the server console.
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // same answer whether the email exists or not (don't leak which emails are registered)
  const message = "If an account with that email exists, a reset link has been sent.";

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      
      const resetToken = crypto.randomBytes(32).toString("hex");

  
      user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
      await user.save();

      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      console.log(`Password reset link for ${user.email}: ${clientUrl}/reset-password/${resetToken}`);
    }

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/users/reset-password/:token  
// Ready for when the FE gets a reset-password page.
const resetPassword = async (req, res) => {
  const { password } = req.body;

  try {
    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Reset link is invalid or has expired" });
    }

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset. You can log in now." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/users/me   (works for users AND non-users)

const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ isAuthenticated: false, user: null });
  }

  res.status(200).json({ isAuthenticated: true, user: req.user });
};

// GET /api/users/profile   (users only)
const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

// DELETE /api/users/profile   (users only)

const deleteProfile = async (req, res) => {
  try {
    await Outfit.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  getProfile,
  deleteProfile,
};
