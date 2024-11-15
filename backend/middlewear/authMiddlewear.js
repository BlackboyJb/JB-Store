import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js';
import User from "../models/userModels.js";



const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt

  try {
    if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this route, No Token' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized to access this route' })
    }
    req.user = await User.findById(decoded.userId).select('-password')
    next();
} catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' })
}
});

const admin = (req, res, next) => {
if(req.user && req.user.isAdmin){
  next()
}else{
  res.status(401)
  throw new Error('Not authorized, user is not an Admin')
}
}

export { protect,admin  };

















































































  // if (token) {
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = await User.findById(decoded.userId).select("-password");
  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not Authorized, Token Failed");
  //   }
  // } else {
  //   res.status(401);
  //   throw new Error("Not Authorized, No token");
  // }