import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // ✅ Use ENV first, fallback to local DB
    const mongoURI =
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/powdersDB";

    // ✅ Connect MongoDB
    await mongoose.connect(mongoURI, {
      autoIndex: true
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// ================= DEBUG LISTENERS (KEEPED SAME) =================

mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connection open");
});

mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🟠 Mongoose disconnected");
});