import express from "express";
import {
  cancelOrder,
  createOrder,
  getOrder,
  getOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", protect, asyncHandler(getOrders));
router.post("/", protect, asyncHandler(createOrder));
router.get("/:id", protect, asyncHandler(getOrder));
router.patch("/:id/cancel", protect, asyncHandler(cancelOrder));

export default router;
