import express from "express";
import { mealPlanner } from "../controllers/mealPlannerController.js";

const router = express.Router();

router.post("/", mealPlanner);

export default router;