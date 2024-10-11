import asyncHandler from "../middlewear/asyncHandler.js";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

//@desc AUTH USER & GET TOKEN
//@route GET /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Paasword");
  }
});

//@desc REGISTER USER
//@route POST /api/users
//@access Public
const regUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, isAdmin } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }
  const user = await User.create({
    fullName,
    email,
    password,
    isAdmin
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin:user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc LOGOUT USER/ClEAR COOKIE
//@route POST /api/users/logout
//@access Private
const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully" });
});

//@desc GET USER PROFILE
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Error Fetching Profile");
  }
});

//@desc UPDATE USER PROFILE
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Error updating Profile");
  }
});

//@desc GET USERS
//@route PUT /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});

//@desc GET USERS BY ID
//@route PUT /api/users/:id
//@access Private
const getUsersById = asyncHandler(async (req, res) => {
  res.send("Get Users by ID");
});

//@desc DELETE USERS
//@route DELETE /api/users/:id
//@access Private/admin
const deleteUsers = asyncHandler(async (req, res) => {
  res.send("Delete Users");
});

//@desc UPDATE USERS
//@route PUT /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

export {
  authUser,
  regUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUsers,
  updateUser,
};
