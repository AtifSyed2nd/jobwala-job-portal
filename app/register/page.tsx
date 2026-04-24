"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type Role = "CANDIDATE" | "RECRUITER";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CANDIDATE" as Role,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username)) {
      newErrors.username = "3–20 chars, letters, numbers, underscore only";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle field errors from backend
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ global: data?.message || "Registration failed" });
        }
        return;
      }

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setErrors({ global: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border space-y-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Start your journey with us
          </p>
        </div>

        {/* GLOBAL ERROR */}
        {errors.global && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {errors.global}
          </div>
        )}

        {/* NAME */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={loading}
            className="input"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* USERNAME */}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            disabled={loading}
            className="input"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={loading}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* ROLE */}
        <div className="flex gap-3">
          {["CANDIDATE", "RECRUITER"].map((role) => (
            <button
              type="button"
              key={role}
              onClick={() => handleChange("role", role)}
              className={`flex-1 border rounded-lg py-2 text-sm font-medium transition ${
                form.role === role
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {role === "CANDIDATE" ? "Candidate" : "Recruiter"}
            </button>
          ))}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            disabled={loading}
            className="w-full border p-2 rounded pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            disabled={loading}
            className="w-full border p-2 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* SUCCESS */}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>

      {/* Tailwind helper classes */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        .error {
          font-size: 12px;
          color: #dc2626;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
