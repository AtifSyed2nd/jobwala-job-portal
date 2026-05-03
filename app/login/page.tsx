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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate a network delay for the UI feel
    setTimeout(() => {
      setLoading(false);

      // MOCK LOGIC: 
      // Redirect to admin if 'admin' is in email, otherwise go to candidate profile
      if (form.email.includes("admin")) {
        router.push("/admin");
      } else if (form.email.includes("recruiter")) {
        router.push("/recruiter/profile");
      } else {
        router.push("/candidate/profile");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. admin@jobportal.app"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={loading}
              className="w-full border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={loading}
                className="w-full border border-slate-200 p-3 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-3 rounded-lg font-medium">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Authenticating..." : "Sign In"}
        </button>

        {/* Footer Link */}
        <p className="text-sm text-center text-slate-500 pt-2">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}