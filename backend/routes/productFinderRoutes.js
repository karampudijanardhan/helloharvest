import express from "express";
import { productFinder } from "../controllers/productFinderController.js";

const router = express.Router();

router.post("/", productFinder);

export default router;