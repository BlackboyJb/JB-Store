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
      isAdmin: user.isAdmin,
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
  const { fullName, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }
  const user = await User.create({
    fullName,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
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
  const users = await User.find({});
  res.status(200).json(users);
});

//@desc GET USERS BY ID
//@route PUT /api/users/:id
//@access Private/ADMIN
const getUsersById = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select("-password");

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc DELETE USERS
//@route DELETE /api/users/:id
//@access Private/admin
const deleteUsers = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id);
  if (users) {
    if (users.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await users.deleteOne({ _id: users._id });
    res.status(200).json({message:'User deleted Succesfully'})
  }else{
    res.status(404)
    throw new Error('User not Found')
  }
});

//@desc UPDATE USERS
//@route PUT /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req, res) => {
 const users = await User.findById(req.params.id);

 if(users){
  users.fullName = req.body.fullName || users.fullName
  users.email = req.body.email || users.email
  users.isAdmin = req.body.isAdmin

  const updatedUsers = await users.save()
  res.status(200).json({
    id:updatedUsers._id,
    fullName:updatedUsers.fullName,
    email:updatedUsers.email,
    isAdmin:updatedUsers.isAdmin
  })
 }else{
  res.status(404)
  throw new Error('user not found')
 }
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
