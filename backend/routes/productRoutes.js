import express from "express";
const router = express.Router();
import {getProduct, getProductById, createProduct,updateProduct, deleteProduct, createProductReviews,getTopProducts} from '../controllers/productControllers.js'
import {protect, admin} from '../middlewear/authMiddlewear.js'
import checkObjectID from "../middlewear/checkObjectID.js";



router.route('/').get(getProduct).post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id').get(checkObjectID,getProductById).put(protect, admin,checkObjectID, updateProduct).delete(protect,admin,checkObjectID,deleteProduct)
router.route('/:id/reviews').post(protect,checkObjectID,createProductReviews)
export default router;
