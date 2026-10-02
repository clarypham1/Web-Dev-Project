import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Reads "Authorization: Bearer <token>" and returns the logged-in user, or null.
// Shared by requireAuth (users only) and optionalAuth (users AND non-users).
const getUserFromToken = async (req) => {
  const { authorization } = req.headers;

  // 1. no header -> non-user (guest)
  if (!authorization) {
    return null;
  }
  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  // 2. "Bearer abc.def.ghi" -> "abc.def.ghi"
  const token = authorization.split(" ")[1];

  // 3. verify the token (throws if it is fake or expired)
  const { _id } = jwt.verify(token, process.env.SECRET);

  // 4. make sure the user still exists (e.g. account was not deleted)
  const user = await User.findById(_id).select("_id name email");
  return user;
};

// ---------- USERS ONLY ----------
// Use on routes a guest must NOT reach (history, delete profile ...)
// Sets req.user or answers 401.
const requireAuth = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);

    if (!user) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

// ---------- USERS + NON-USERS ----------
// Use on routes everyone can reach but logged-in users get more (homepage).
// Sets req.user to the user, or to null for a guest. Never blocks the request.
const optionalAuth = async (req, res, next) => {
  try {
    req.user = await getUserFromToken(req);
  } catch (error) {
    // bad / expired token -> just treat them as a guest
    req.user = null;
  }
  next();
};

export { requireAuth, optionalAuth };
