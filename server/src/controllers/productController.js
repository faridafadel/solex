import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js";

const buildProductFilters = (query) => {
  const filters = {};

  if (query.category) {
    filters.category = query.category;
  }

  if (query.popular === "true") {
    filters.popular = true;
  }

  if (query.search) {
    filters.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
      { sku: { $regex: query.search, $options: "i" } },
    ];
  }

  return filters;
};

export const getProducts = async (req, res) => {
  const filters = buildProductFilters(req.query);
  const products = await Product.find(filters).sort({ createdAt: -1 });
  res.json({ count: products.length, products });
};

export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  const reviews = await Review.find({ product: product._id })
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  res.json({
    product,
    reviews,
  });
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  await Review.deleteMany({ product: product._id });
  await product.deleteOne();

  res.json({ message: "Product deleted successfully." });
};
