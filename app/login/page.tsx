"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Invalid credentials");
        return;
      }

      // ✅ Safe redirect
      const safeRedirects = [
        "/candidate/profile",
        "/recruiter/profile",
        "/admin",
      ];

      const redirect = data?.data?.redirectUrl;

      router.push(safeRedirects.includes(redirect) ? redirect : "/");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-5"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1">
            Login to your account
          </p>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={loading}
            className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password with Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            disabled={loading}
            className="w-full border border-slate-300 p-2.5 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p className="text-sm text-center text-slate-500">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}