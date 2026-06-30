import express from "express";
import {
  createBasket,
  getBaskets,
  getBasketById,
  getMyBaskets,
} from "../controllers/basketController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new basket (Protected)
router.post("/", protect, createBasket);

// Get all open baskets (Public)
router.get("/", getBaskets);

// Get current user's baskets (Protected) - Must be before /:id
router.get("/my", protect, getMyBaskets);

// Get a single basket by ID (Public)
router.get("/:id", getBasketById);

export default router;