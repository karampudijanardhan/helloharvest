import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

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

// ================= API ROUTES =================

app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/reviews", reviewRoutes);

// ================= HEALTH CHECK =================

app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// ================= SERVE FRONTEND =================

// 🔥 IMPORTANT: path setup
const __dirname = path.resolve();
const distPath = path.join(__dirname, "../frontend/dist");

// Serve static files
app.use(express.static(distPath));

// 🔥 SPA ROUTING FIX (VERY IMPORTANT)
app.get("*", (req, res) => {
  // if API route → return JSON
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }

  // otherwise serve React app
  res.sendFile(path.join(distPath, "index.html"));
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