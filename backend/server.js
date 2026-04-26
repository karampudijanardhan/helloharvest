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

// ✅ CORS (important for frontend connection)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// ================= ROUTES =================

// API ROUTES
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/reviews", reviewRoutes);

// TEST ROUTE
app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// ================= FRONTEND =================

// Serve frontend (for production)
const __dirname = path.resolve();
const distPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(distPath));

// SPA fallback
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      message: "API route not found"
    });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});