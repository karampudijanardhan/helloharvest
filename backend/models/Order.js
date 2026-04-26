import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderRef: {
      type: String,
      required: true
    },

    username: {
      type: String
    },

    name: String,

    phone: {
      type: String,
      required: true
    },

    address: String,

    paymentMethod: String,

    // ✅ UTR NUMBER
    utr: String,

    // ✅ PAYMENT STATUS
    paymentStatus: {
      type: String,
      default: "Pending Verification"
    },

    items: [
      {
        productId: String,
        name: String,
        image: String,
        qty: Number,
        weight: String,
        price: Number
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "PLACED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);