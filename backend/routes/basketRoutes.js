import express from "express";
import {
  createBasket,
  getBaskets,
  getBasketById,
  getMyBaskets,
} from "../controllers/basketController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBasket);
router.get("/", protect, getBaskets);
router.get("/my", protect, getMyBaskets);
router.get("/:id", protect, getBasketById);

export default router;