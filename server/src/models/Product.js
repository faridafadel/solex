import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: "",
      trim: true,
    },
    gender: {
      type: String,
      default: "",
      trim: true,
    },
    vendor: {
      type: String,
      default: "Solex",
      trim: true,
    },
    availability: {
      type: String,
      default: "In Stock",
      trim: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
