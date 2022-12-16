import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../Controllers/ProductController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', getAllProducts);
router.post('/', protect, admin, createProduct);
router.post('/:id/reviews', protect, createProductReview);
router.get('/top', getTopProducts);
router.delete('/:id', protect, admin, deleteProduct);
router.get('/:id', getSingleProduct);
router.put('/:id', protect, admin, updateProduct);

export default router;
