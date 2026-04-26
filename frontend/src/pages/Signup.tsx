import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface SignupForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<SignupForm>({
    username: "",
    password: "",
    confirmPassword: ""
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

    // ✅ Password match check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      // ✅ NEW BACKEND API
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username: form.username,
          password: form.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Signup successful ✅. Please login.");

      navigate("/login");

    } catch (err: any) {

      console.error("Signup error:", err);

      alert(err.response?.data?.message || "Signup failed ❌");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4 overflow-x-hidden">

      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-card border-2 border-gray-300 hover:border-orange-400 transition p-8">

        <h2 className="text-2xl font-display text-center mb-6 text-spice-brown">
          Create Account
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
              placeholder="Choose a username"
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
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg gradient-gold text-secondary-foreground font-medium shadow-warm hover:shadow-hover transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-5 text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );
};

export default Signup;