import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
} from '../Controllers/ProductController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', getAllProducts);
router.delete('/:id', protect, admin, deleteProduct);
router.get('/:id', getSingleProduct);

export default router;
