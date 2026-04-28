import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://helloharvest.onrender.com/api/auth/admin-login",
        { email: email.trim().toLowerCase() }
      );

      localStorage.setItem("adminToken", res.data.token);

      alert("Admin Login Success");

      navigate("/admin-dashboard");
    } catch (err: any) {
      console.error(err);
      alert("Invalid Admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4 overflow-x-hidden">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-card border-2 border-gray-300 hover:border-orange-400 transition p-8">

        <h2 className="text-2xl font-display text-center mb-6 text-spice-brown">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-input px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-input px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />

          {/* ✅ GREEN BUTTON */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-700 hover:bg-green-500 text-white font-medium transition-all duration-300"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminLogin;