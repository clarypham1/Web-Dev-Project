import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const getUserFromToken = async (req) => {
  const { authorization } = req.headers;


  if (!authorization) {
    return null;
  }
  if (!authorization.startsWith("Bearer ")) {
    return null;
  }
  const token = authorization.split(" ")[1];

  const { _id } = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(_id).select("_id name email");
  return user;
};


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


const optionalAuth = async (req, res, next) => {
  try {
    req.user = await getUserFromToken(req);
  } catch (error) {

    req.user = null;
  }
  next();
};

export { requireAuth, optionalAuth };
