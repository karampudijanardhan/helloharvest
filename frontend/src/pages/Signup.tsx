import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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

    if (form.password !== form.confirmPassword) {
      toast.error("Password Mismatch", {
  description: "Password and Confirm Password must be the same.",
  duration: 3000,
});
      return;
    }

    setLoading(true);

    try {
      await api.post(
        "/api/auth/signup",
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

     toast.success("Account Created 🎉", {
  description: "Your account has been created successfully.",
  duration: 2500,
});

setTimeout(() => {
  navigate("/login");
}, 1000);

    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error("Signup Failed", {
  description:
    err.response?.data?.message || "Unable to create your account.",
  duration: 3000,
});
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-background px-4 overflow-x-hidden">

      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-card border-2 border-gray-300 hover:border-green-500 transition p-8">

        <h2 className="text-2xl font-display text-center mb-6 text-foreground">
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
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Button */}
          <button
  type="submit"
  disabled={loading}
  className="w-full py-2 rounded-lg bg-green-700 hover:bg-green-500 text-white font-medium transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      Creating Account...
    </>
  ) : (
    "Create Account"
  )}
</button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-5 text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );
};

export default Signup;