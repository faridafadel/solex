import express from "express";
import {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", protect, asyncHandler(getCart));
router.post("/items", protect, asyncHandler(addItem));
router.patch("/items/:productId", protect, asyncHandler(updateItem));
router.delete("/items/:productId", protect, asyncHandler(removeItem));
router.delete("/", protect, asyncHandler(clearCart));

export default router;
