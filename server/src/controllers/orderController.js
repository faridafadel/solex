import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name slug imageUrl")
    .sort({ createdAt: -1 });

  res.json({ count: orders.length, orders });
};

export const getOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("items.product", "name slug imageUrl");

  if (!order) {
    const error = new Error("Order not found.");
    error.statusCode = 404;
    throw error;
  }

  res.json(order);
};

export const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items?.length) {
    const error = new Error("Order must contain at least one item.");
    error.statusCode = 400;
    throw error;
  }

  if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.street || !shippingAddress?.city) {
    const error = new Error("Complete shipping address is required (fullName, phone, street, city).");
    error.statusCode = 400;
    throw error;
  }

  const populatedItems = [];
  let totalAmount = 0;

  for (const item of items) {
    let product = await Product.findById(item.productId);
    if (!product && item.productName) {
      product = await Product.findOne({ name: item.productName });
    }
    if (!product) {
      const error = new Error(`Product not found: ${item.productId || item.productName}`);
      error.statusCode = 404;
      throw error;
    }

    const price = product.price;
    const quantity = item.quantity || 1;

    populatedItems.push({
      product: product._id,
      name: product.name,
      price,
      quantity,
      size: item.size || "",
    });

    totalAmount += price * quantity;
  }

  const order = await Order.create({
    user: req.user._id,
    items: populatedItems,
    shippingAddress,
    totalAmount,
    paymentMethod: paymentMethod || "cash",
  });

  const populatedOrder = await order.populate("items.product", "name slug imageUrl");
  res.status(201).json(populatedOrder);
};

export const cancelOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!order) {
    const error = new Error("Order not found.");
    error.statusCode = 404;
    throw error;
  }

  if (!["pending", "confirmed"].includes(order.status)) {
    const error = new Error("Only pending or confirmed orders can be cancelled.");
    error.statusCode = 400;
    throw error;
  }

  order.status = "cancelled";
  await order.save();
  res.json(order);
};
