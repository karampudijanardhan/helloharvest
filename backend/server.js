import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";

import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import visitorRoutes from "./routes/visitor.js";
import reviewRoutes from "./routes/reviews.js";

dotenv.config();

// DB CONNECT
connectDB();

const app = express();

// ✅ CORS (clean + flexible)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://helloharvest-frontend.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Middleware
app.use(express.json());

// ================= ROUTES =================

app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/reviews", reviewRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});