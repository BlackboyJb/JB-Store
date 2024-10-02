import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewear/authMiddlewear.js";
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

router.route("/").post(regUser).get(protect, admin, getUsers);
router.post("/logout", logOutUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect,admin,deleteUsers).get(protect, admin, getUsersById).put(protect, admin,updateUser);

export default router;
