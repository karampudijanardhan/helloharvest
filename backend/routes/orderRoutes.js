import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  trackOrder,
  verifyPayment
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/my/:username", getMyOrders);
router.get("/track/:orderId", trackOrder);
router.put("/status/:id", updateOrderStatus);
router.put("/verify/:id", verifyPayment);

export default router;