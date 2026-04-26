import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

// ✅ FIX __dirname (important for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS (final fix)
app.use(
  cors({
    origin: true, // allow all
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

// ================= HEALTH =================
app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// ================= FRONTEND =================

// 🔥 FINAL CORRECT PATH
const distPath = path.join(__dirname, "../frontend/dist");

// serve frontend static
app.use(express.static(distPath));

// SPA fallback (for refresh)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"));
});

// ================= ERROR =================
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