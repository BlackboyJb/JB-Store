import express from 'express'
const router = express.Router()
import {addOrderItems,getMyOrders,getOrderById,updateOrdersToPaid,updateOrdersToDelivered,getOrders} from '../controllers/orderControllers.js'
import {protect,admin} from '../middlewear/authMiddlewear.js'


router.route('/').post(protect,addOrderItems).get(protect, admin,getOrders);
router.route('/mine').get(protect,getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrdersToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrdersToDelivered)

export default router