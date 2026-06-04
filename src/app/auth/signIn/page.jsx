"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FiLock,
  FiMail,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { signIn } from "@/lib/auth-client";

export default function SignInpage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // ================= VALIDATION =================
  const validate = () => {
    if (!form.email || !form.password) {
      return "All fields are required";
    }

    if (!form.email.includes("@")) {
      return "Invalid email address";
    }

    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const { error: authError } = await signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: "/dashboard",
      });

      if (authError) {
        throw new Error(
          authError.message || "Sign in failed. Check credentials."
        );
      }

      setSuccess("Logged in successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06070d] flex items-center justify-center px-4 py-10">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_35%)]" />

      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-md">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => router.push("/auth/signUp")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] text-gray-300 hover:text-white transition-all duration-300 text-sm"
          >
            <FiArrowLeft />
            Create Account
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

            <span className="text-xs font-semibold tracking-[0.25em] text-gray-300">
              WONDER CORP
            </span>
          </div>
        </div>

        {/* CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6 md:p-8">
          {/* TOP LINE */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* TITLE */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Sign in to continue to your account
            </p>
          </div>

          {/* ALERTS */}
          {(error || success) && (
            <div className="mb-5">
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  {success}
                </div>
              )}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent opacity-0 blur-xl transition-all duration-500 group-focus-within:opacity-100" />

              <div className="relative flex items-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-focus-within:border-blue-400/30 group-focus-within:bg-white/[0.05] px-4 h-16">
                {/* LEFT */}
                <div
                  className={`flex items-center transition-all duration-300 ${
                    form.email ? "w-auto mr-3" : "gap-3 min-w-[120px]"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-gray-400 transition-colors group-focus-within:text-blue-400">
                    <FiMail className="text-sm" />
                  </div>

                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 transition-all duration-300 group-focus-within:text-blue-300 whitespace-nowrap ${
                      form.email
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    }`}
                  >
                    Email
                  </span>
                </div>

                {/* INPUT */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600 h-full"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent opacity-0 blur-xl transition-all duration-500 group-focus-within:opacity-100" />

              <div className="relative flex items-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-focus-within:border-blue-400/30 group-focus-within:bg-white/[0.05] px-4 h-16">
                {/* LEFT */}
                <div
                  className={`flex items-center transition-all duration-300 ${
                    form.password ? "w-auto mr-3" : "gap-3 min-w-[120px]"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-gray-400 transition-colors group-focus-within:text-blue-400">
                    <FiLock className="text-sm" />
                  </div>

                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 transition-all duration-300 group-focus-within:text-blue-300 whitespace-nowrap ${
                      form.password
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    }`}
                  >
                    Password
                  </span>
                </div>

                {/* INPUT */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600 h-full"
                />

                {/* TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-3 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-sm" />
                  ) : (
                    <FiEye className="text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium text-white transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 border-t border-white/[0.06] pt-5 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?

              <button
                type="button"
                onClick={() => router.push("/auth/signUp")}
                className="ml-2 text-white transition-colors hover:text-blue-300"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}