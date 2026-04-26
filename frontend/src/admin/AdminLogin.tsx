import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface AdminForm {
  email: string;
}

const AdminLogin: React.FC = () => {

  const [form, setForm] = useState<AdminForm>({
    email: ""
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

      const res = await fetch(
  "http://localhost:5000/api/auth/admin-login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: form.email.trim().toLowerCase() // ✅ important
    })
  }
);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Admin login failed");
      }

      // save admin token
      localStorage.setItem("adminToken", data.token);

      alert("Admin login successful ✅");

      navigate("/admin-dashboard");

    } catch (error: any) {

      alert(error.message || "Invalid admin email ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4">

      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-card p-8">

        <h2 className="text-2xl font-display text-center mb-6 text-spice-brown">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg gradient-saffron text-primary-foreground font-medium shadow-warm hover:shadow-hover transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;