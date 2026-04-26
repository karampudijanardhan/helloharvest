import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ NEW BACKEND API (UPDATED)
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // 🔐 Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      // 🔔 Notify Navbar
      window.dispatchEvent(new Event("login-success"));

      alert("Login successful ✅");

      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4 overflow-x-hidden">

      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-card border-2 border-gray-300 hover:border-orange-400 transition p-8">

        <h2 className="text-2xl font-display text-center mb-6 text-spice-brown">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />

            {/* ✅ FORGOT PASSWORD (KEPT) */}
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg gradient-saffron text-primary-foreground font-medium shadow-warm hover:shadow-hover transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Signup */}
        <p className="text-sm text-center mt-5 text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* ✅ ADMIN LOGIN (KEPT) */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-2 mt-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-white transition"
          >
            Admin Login
          </button>
        </div>

      </div>

    </div>
  );
};

export default Login;