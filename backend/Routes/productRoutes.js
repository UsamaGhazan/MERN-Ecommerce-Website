import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getSingleProduct,
} from '../Controllers/ProductController.js';

router.get('/', getAllProducts);

router.get('/:id', getSingleProduct);

export default router;
