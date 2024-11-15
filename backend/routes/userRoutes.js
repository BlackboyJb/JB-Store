import express from "express";
const router = express.Router();
import {
  authUser,
  regUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersById,
  deleteUsers,
  updateUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middlewear/authMiddlewear.js";




router.route("/").get(protect,admin, getUsers);
router.post("/register", regUser);
router.post("/logout", logOutUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUsersById)
  .put(protect, admin, updateUser);
 

export default router;
