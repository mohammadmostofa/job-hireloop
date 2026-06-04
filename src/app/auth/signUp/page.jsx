"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label, Radio, RadioGroup} from "@heroui/react";

import {
  FiUser,
  FiLock,
  FiMail,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] =  useState("seeker");
  

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
    if (!form.name || !form.email || !form.password) {
      return "All fields are required";
    }

    if (!form.email.includes("@")) {
      return "Please enter a valid email";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
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

      const { error: authError } = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        role ,
    
      });

      if (authError) {
        throw new Error(authError.message || "Signup failed");
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06070d] flex items-center justify-center px-4">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_35%)]" />

      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-[460px]">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => router.push("/auth/signIn")}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-gray-300 hover:text-white transition-all duration-300 text-sm backdrop-blur-xl"
          >
            <FiArrowLeft />
            Sign In
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

            <span className="text-xs font-semibold tracking-[0.25em] text-gray-300">
              WONDER CORP
            </span>
          </div>
        </div>

        {/* CARD */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.04] backdrop-blur-3xl shadow-[0_30px_120px_rgba(0,0,0,0.6)] px-7 py-8 md:px-8 md:py-9">
          {/* TOP GLOW LINE */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* HEADER */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-inner">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]" />
            </div>

            <h1 className="text-[30px] leading-none font-semibold tracking-tight text-white">
              Create Account
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Join Wonder Corp and access your dashboard
            </p>
          </div>

          {/* ALERTS */}
          {(error || success) && (
            <div className="mb-5 space-y-3">
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-xl">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400 backdrop-blur-xl">
                  {success}
                </div>
              )}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent opacity-0 blur-xl transition-all duration-500 group-focus-within:opacity-100" />

              <div className="relative flex items-center h-[68px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 transition-all duration-300 group-focus-within:border-blue-400/30 group-focus-within:bg-white/[0.05]">
                {/* LEFT */}
                <div
                  className={`flex items-center transition-all duration-300 ${
                    form.name ? "w-auto mr-3" : "gap-3 min-w-[130px]"
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.04] text-gray-400 group-focus-within:text-blue-400 transition-colors">
                    <FiUser className="text-sm" />
                  </div>

                  <span
                    className={`text-[11px] uppercase tracking-[0.18em] text-gray-500 group-focus-within:text-blue-300 font-semibold whitespace-nowrap transition-all duration-300 ${
                      form.name
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    }`}
                  >
                    Full Name
                  </span>
                </div>

                {/* INPUT */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="flex-1 h-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>


            {/* EMAIL */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent opacity-0 blur-xl transition-all duration-500 group-focus-within:opacity-100" />

              <div className="relative flex items-center h-[68px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 transition-all duration-300 group-focus-within:border-blue-400/30 group-focus-within:bg-white/[0.05]">
                {/* LEFT */}
                <div
                  className={`flex items-center transition-all duration-300 ${
                    form.email ? "w-auto mr-3" : "gap-3 min-w-[130px]"
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.04] text-gray-400 group-focus-within:text-blue-400 transition-colors">
                    <FiMail className="text-sm" />
                  </div>

                  <span
                    className={`text-[11px] uppercase tracking-[0.18em] text-gray-500 group-focus-within:text-blue-300 font-semibold whitespace-nowrap transition-all duration-300 ${
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
                  className="flex-1 h-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent opacity-0 blur-xl transition-all duration-500 group-focus-within:opacity-100" />

              <div className="relative flex items-center h-[68px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 transition-all duration-300 group-focus-within:border-blue-400/30 group-focus-within:bg-white/[0.05]">
                {/* LEFT */}
                <div
                  className={`flex items-center transition-all duration-300 ${
                    form.password ? "w-auto mr-3" : "gap-3 min-w-[130px]"
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.04] text-gray-400 group-focus-within:text-blue-400 transition-colors">
                    <FiLock className="text-sm" />
                  </div>

                  <span
                    className={`text-[11px] uppercase tracking-[0.18em] text-gray-500 group-focus-within:text-blue-300 font-semibold whitespace-nowrap transition-all duration-300 ${
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
                  placeholder="Create password"
                  className="flex-1 h-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />

                {/* TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-3 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-[18px]" />
                  ) : (
                    <FiEye className="text-[18px]" />
                  )}
                </button>
              </div>
            </div>

             {/* role selection */}
                 <div className="flex flex-col gap-4">
  <Label>Account Type</Label>

  {/* RadioGroup-এর defaultValue-ই নির্ধারণ করবে কোনটা সিলেক্টেড থাকবে */}
  <RadioGroup
    defaultValue="seeker"
    name="role" onChange={ value => setRole(value)}
    orientation="horizontal"
  >
    {/* Job Seeker */}
    {/* এখান থেকে 'selected' বাদ দেওয়া হয়েছে এবং 'Value' কে 'value' করা হয়েছে */}
    <Radio value="seeker">
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content>
        <Label>Job Seeker</Label>
      </Radio.Content>
    </Radio>

    {/* Recruiter */}
    <Radio value="recruiter">
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content>
        <Label>Recruiter</Label>
      </Radio.Content>
    </Radio>
  </RadioGroup>
</div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium text-white transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 shadow-[0_15px_35px_rgba(59,130,246,0.35)]"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <a href="/auth/signUp">Creating Account...</a>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-7 border-t border-white/[0.06] pt-5 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?

              <button
                type="button"
                onClick={() => router.push("/auth/signIn")}
                className="ml-2 text-white hover:text-blue-300 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}