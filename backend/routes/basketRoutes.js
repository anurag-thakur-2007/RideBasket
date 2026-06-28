import express from "express";
import {
  createBasket,
  getBaskets,
} from "../controllers/basketController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new basket (Protected)
router.post("/", protect, createBasket);

// Get all open baskets (Public)
router.get("/", getBaskets);

export default router;