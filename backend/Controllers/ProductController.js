import Product from '../Models/ProductModel.js';
import asyncHandler from 'express-async-handler'; //to avoid try catch

const getAllProducts = asyncHandler(async (req, res) => {
  //For pagination
  const pageSize = 10;
  //as a string query ati hy usko number mein convert kea hy
  //Agr query ni hy to smjo k 1st page pr hy is leye or 1 kar dea hy
  const page = Number(req.query.pageNumber) || 1;
  //For searching
  //query string ko access karny k leye req.query use karty
  const keyword = req.query.keyword
    ? {
        //directly name:req.query is leye ni kr rahy kun k is case mein humy exact name dalna pary ga product search karna k leye
        name: {
          $regex: req.query.keyword,
          //case-insensitive
          $options: 'i',
        },
        //Agr keyword exist nai karta aur just '' empty string hy to simple brackets return kro(for getting all the products in find method below)
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  //sirf keyword is leye ni likha find method mein kun k wo pora object dy dy ga aur humy object k elements chaiyein
  //agr keyword ni hy to sab products dy dy ga kun k {} return hora keyword mein
  // jitna pageSize hoga utni products get kry ga .limit method ki waja sy
  //skip method sy next page pr pechly wali products skip hojaein gi
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

//Delete a product
//Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//Create a product
//Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//Update a product
//Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//Create new Review
//Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    //Agr already review ni hoa wa product
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    //reviews array hy isleye push method use kea
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
