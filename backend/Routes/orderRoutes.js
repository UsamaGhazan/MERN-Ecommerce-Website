import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
} from '../Controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getAllOrders);
router.get('/myorders', protect, getMyOrders);
//Make sure to pass route containing :id params to bottom otherwise anything u pass after '/' route will take it as id
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
export default router;
