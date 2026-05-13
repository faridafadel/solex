import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    "name slug price imageUrl sku color sizes inStock"
  );

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json(cart);
};

export const addItem = async (req, res) => {
  const { productId, quantity, size } = req.body;

  if (!productId) {
    const error = new Error("productId is required.");
    error.statusCode = 400;
    throw error;
  }

  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId && item.size === (size || "")
  );

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    cart.items.push({
      product: productId,
      quantity: quantity || 1,
      size: size || "",
    });
  }

  await cart.save();

  cart = await Cart.findById(cart._id).populate(
    "items.product",
    "name slug price imageUrl sku color sizes inStock"
  );

  res.json(cart);
};

export const updateItem = async (req, res) => {
  const { quantity, size } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    const error = new Error("Cart not found.");
    error.statusCode = 404;
    throw error;
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    const error = new Error("Item not found in cart.");
    error.statusCode = 404;
    throw error;
  }

  if (quantity !== undefined) {
    if (quantity < 1) {
      cart.items.pull({ product: productId });
    } else {
      item.quantity = quantity;
    }
  }

  if (size !== undefined) {
    item.size = size;
  }

  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name slug price imageUrl sku color sizes inStock"
  );

  res.json(updatedCart);
};

export const removeItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    const error = new Error("Cart not found.");
    error.statusCode = 404;
    throw error;
  }

  cart.items.pull({ product: productId });

  await cart.save();

  const updatedCart = await Cart.findById(cart._id).populate(
    "items.product",
    "name slug price imageUrl sku color sizes inStock"
  );

  res.json(updatedCart);
};

export const clearCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }

  res.json({ message: "Cart cleared successfully." });
};
