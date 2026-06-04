"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Crown, BarChart3, Zap, Plus, ArrowRight } from "lucide-react";

export default function PricingCard() {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // monthly or yearly

  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: <Crown className="w-4 h-4 text-pink-400" />,
      price: billingPeriod === "monthly" ? "0" : "0",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      isPopular: false,
    },
    {
      id: "growth",
      name: "Growth",
      icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
      price: billingPeriod === "monthly" ? "17" : "13", // উদাহরণস্বরূপ ইয়ারলি ডিসকাউন্টেড প্রাইজ
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      isPopular: true, // মাঝখানের কার্ডটি ইমেজের মতো একটু বেশি হাইলাইটেড
    },
    {
      id: "premium",
      name: "Premium",
      icon: <Zap className="w-4 h-4 text-blue-400" />,
      price: billingPeriod === "monthly" ? "99" : "79",
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="text-center max-w-3xl mx-auto mb-12 z-10">
        {/* Blue Square Bullet + PRICING */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-4">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm inline-block" />
          Pricing
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm inline-block" />
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white mb-8 leading-tight">
          Pay for the leverage, <br />
          <span className="text-zinc-400">not the listings</span>
        </h2>

        {/* TOGGLE SWITCH */}
        <div className="inline-flex items-center bg-[#111114] p-1 rounded-full border border-zinc-800/60 shadow-inner">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              billingPeriod === "monthly"
                ? "bg-white text-black shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`relative flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              billingPeriod === "yearly"
                ? "bg-white text-black shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-600 text-white rounded-full scale-95">
              25%
            </span>
          </button>
        </div>
      </div>

      {/* ================= PRICING CARDS GRID ================= */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 z-10 items-stretch">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className={`flex flex-col justify-between bg-[#0b0b0d] border rounded-[24px] p-8 transition-all duration-300 ${
              plan.isPopular 
                ? "border-zinc-700/80 shadow-[0_0_40px_rgba(255,255,255,0.03)]" 
                : "border-zinc-900"
            }`}
          >
            <div>
              {/* Card Header (Icon + Title + Price) */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800/40">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-normal text-zinc-300">{plan.name}</h3>
                </div>
                <div className="flex items-baseline text-white">
                  <span className="text-4xl font-semibold tracking-tight">${plan.price}</span>
                  <span className="text-xs text-zinc-500 ml-1">/month</span>
                </div>
              </div>

              {/* Sub-heading text */}
              <p className="text-sm font-medium text-zinc-300 mb-6">
                Start building your insights hub:
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="p-1 bg-zinc-900 border border-zinc-800/50 rounded-md shrink-0">
                      <Plus className="w-3 h-3 text-zinc-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              className={`w-full py-4 px-6 rounded-xl text-sm font-medium flex items-center justify-between transition-all duration-300 ${
                plan.isPopular
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-zinc-900/60 text-zinc-300 border border-zinc-800/60 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span>Choose This Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (ডিজাইন আরও প্রিমিয়াম করার জন্য) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}