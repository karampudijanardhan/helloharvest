import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// 📝 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    let { username, password } = req.body || {};

    // ✅ normalize (VERY IMPORTANT)
    username = username?.trim().toLowerCase();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Signup successful"
    });

  } catch (err) {
    console.error("Signup error:", err);

    // 🔥 duplicate safety
    if (err.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }

    res.status(500).json({ message: err.message || "Signup failed" });
  }
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    // ✅ normalize (same as signup)
    username = username?.trim().toLowerCase();

    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});


// 🔑 RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  try {
    let { username, newPassword } = req.body;

    // ✅ normalize
    username = username?.trim().toLowerCase();

    if (!username || !newPassword) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // model hashes it
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
});


// 🔐 ADMIN LOGIN
router.post("/admin-login", async (req, res) => {
  try {
    const { email } = req.body;

    const adminEmail = "powders@gmail.com";

    if (!email || email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
      return res.status(401).json({ message: "Not authorized as admin" });
    }

    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({ token, admin: true });

  } catch (err) {
    res.status(500).json({ message: "Admin login failed" });
  }
});

export default router;