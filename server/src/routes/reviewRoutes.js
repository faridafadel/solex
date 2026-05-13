import express from "express";
import { createReview, deleteReview, getReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getReviews));
router.post("/", protect, asyncHandler(createReview));
router.delete("/:id", protect, asyncHandler(deleteReview));

export default router;
