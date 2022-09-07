import Product from '../Models/ProductModel.js';
import asyncHandler from 'express-async-handler'; //to avoid try catch

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found'); //This will work after making custom error handler
  }
});

export { getAllProducts, getSingleProduct };
