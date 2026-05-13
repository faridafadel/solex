import express from "express";
import { createContact } from "../controllers/contactController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(createContact));

export default router;
