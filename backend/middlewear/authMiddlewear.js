
import jwt from 'jsonwebtoken'
import asyncHandler from "../middlewear/asyncHandler.js";
import User from "../models/userModels.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.User && req.User.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized, User is not an Admin");
  }
});

export { protect, admin };
