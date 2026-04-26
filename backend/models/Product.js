import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    weightOptions: {
      type: [String],
      default: ["250g", "500g", "1kg"]
    },

    prices: {
      "250g": { type: Number, default: 0 },
      "500g": { type: Number, default: 0 },
      "1kg": { type: Number, default: 0 }
    },

    spiceLevel: String,
    shelfLife: String,

    stock: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    },

    badges: {
      type: [String],
      default: []
    },

    description: String,

    ingredients: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;