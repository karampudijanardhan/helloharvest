import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword: React.FC = () => {

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await axios.post(
        "https://helloharvest.onrender.com/api/auth/reset-password",
        {
          username,
          newPassword
        }
      );

      alert("Password updated successfully ✅");
      navigate("/login");

    } catch (err: any) {
      alert(err.response?.data?.message || "Error updating password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-card rounded-xl shadow-card border-2 border-gray-300 hover:border-green-500 transition p-8">

        <h2 className="text-2xl text-center mb-6 font-semibold text-foreground">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-700 hover:bg-green-500 text-white rounded-lg transition-all duration-300"
          >
            Save Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;