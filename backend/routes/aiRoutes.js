import express from "express";
import { healthAdvisor } from "../controllers/aiController.js";

const router = express.Router();

router.post("/health", healthAdvisor);

export default router;