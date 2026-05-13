import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/:slug", asyncHandler(getProductBySlug));
router.post("/", protect, asyncHandler(createProduct));
router.patch("/:id", protect, asyncHandler(updateProduct));
router.delete("/:id", protect, asyncHandler(deleteProduct));

export default router;
