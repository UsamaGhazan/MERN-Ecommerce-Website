import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      //which admin created which product
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This adds a relationship bw product and user
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    review: [reviewSchema],
    rating: {
      //average of all reviews
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: String,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timeStamps: true, //createdAt
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
