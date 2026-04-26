import express from "express";
import Review from "../models/Review.js";

const router = express.Router();


// ⭐ Add Review
router.post("/", async (req, res) => {

  try {

    const { productId, username, rating, comment } = req.body;

    if (!productId || !username || !rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const review = new Review({
      productId,
      username,
      rating,
      comment
    });

    await review.save();

    res.json(review);

  } catch (error) {

    console.error("Review error:", error);

    res.status(500).json({ message: "Failed to add review" });

  }

});


// ⭐ Get Reviews by Product
router.get("/:productId", async (req, res) => {

  try {

    const reviews = await Review.find({
      productId: req.params.productId
    }).sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch reviews" });

  }

});

export default router;