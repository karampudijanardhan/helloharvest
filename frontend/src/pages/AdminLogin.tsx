import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import api from "../utils/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/api/auth/admin-login", {
        email: email.trim().toLowerCase(),
      });

      localStorage.setItem("adminToken", res.data.token);

      toast.success("Admin Login Successful 🎉", {
        description: "Welcome to HelloHarvest Admin Dashboard",
        duration: 2500,
      });

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 800);
    } catch (err: any) {
      console.error(err);

      toast.error("Login Failed", {
        description:
          err.response?.data?.message || "Invalid Admin Email",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-green-200 p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-green-700" />
          </div>

          <h1 className="text-3xl font-bold text-green-700">
            Admin Login
          </h1>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Login to access HelloHarvest Admin Dashboard
          </p>

        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Admin Login"
            )}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;