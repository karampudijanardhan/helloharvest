import express from "express";

const router = express.Router();

let visitors = 0;

// increase visitor
router.get("/visit", (req, res) => {
  visitors++;
  res.json({ visitors });
});

// get visitor count
router.get("/count", (req, res) => {
  res.json({ visitors });
});

export default router;