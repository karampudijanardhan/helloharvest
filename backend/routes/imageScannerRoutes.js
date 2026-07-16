import express from "express";
import upload from "../middleware/upload.js";
import { scanFood } from "../controllers/imageScannerController.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  scanFood
);

export default router;