import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true
    },

    username: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// ✅ Faster queries
reviewSchema.index({ productId: 1 });

export default mongoose.model("Review", reviewSchema);