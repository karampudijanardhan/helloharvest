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
        "https://vov-foods-1.onrender.com/api/auth/reset-password",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4">

      <div className="w-full max-w-md bg-card rounded-xl shadow-card border-2 border-gray-300 p-8">

        <h2 className="text-2xl text-center mb-6 font-semibold">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded-lg"
          >
            Save Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;