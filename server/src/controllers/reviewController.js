import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js";

export const getReviews = async (req, res) => {
  const filters = {};

  if (req.query.productId) {
    filters.product = req.query.productId;
  }

  const reviews = await Review.find(filters)
    .populate("product", "name slug")
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  res.json({ count: reviews.length, reviews });
};

export const createReview = async (req, res) => {
  const { productId, rating, title, comment } = req.body;

  if (!productId || !rating || !title || !comment) {
    const error = new Error("productId, rating, title, and comment are required.");
    error.statusCode = 400;
    throw error;
  }

  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  const review = await Review.create({
    product: product._id,
    user: req.user._id,
    rating,
    title,
    comment,
  });

  const populatedReview = await review.populate("user", "fullName email");
  res.status(201).json(populatedReview);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    const error = new Error("Review not found.");
    error.statusCode = 404;
    throw error;
  }

  if (review.user.toString() !== req.user._id.toString()) {
    const error = new Error("You can only delete your own reviews.");
    error.statusCode = 403;
    throw error;
  }

  await review.deleteOne();
  res.json({ message: "Review deleted successfully." });
};
