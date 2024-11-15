import express from "express";
const router = express.Router();
import {getProduct, getProductById, createProduct,updateProduct, deleteProduct, createProductReviews,getTopProducts} from '../controllers/productControllers.js'
import {protect, admin} from '../middlewear/authMiddlewear.js'



router.route('/').get(getProduct).post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect,admin,deleteProduct)
router.route('/:id/reviews').post(protect,createProductReviews)
export default router;
