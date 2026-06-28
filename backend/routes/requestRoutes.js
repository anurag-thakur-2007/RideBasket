import express from "express";
import {
  joinBasket,
  getMyRequests,
  getPendingRequests,
  markWhatsappClicked,
  acceptRequest,
  rejectRequest,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST Routes
router.post("/join", protect, joinBasket);
router.post(
  "/whatsapp-click/:requestId",
  protect,
  markWhatsappClicked
);

// PUT Routes
router.put(
  "/accept/:requestId",
  protect,
  acceptRequest
);
router.put(
  "/reject/:requestId",
  protect,
  rejectRequest
);

// GET Routes
router.get("/my", protect, getMyRequests);
router.get("/pending", protect, getPendingRequests);

export default router;