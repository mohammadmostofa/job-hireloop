"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Search, 
  TrendingUp, 
  BarChart4, 
  Bookmark, 
  MousePointerClick, 
  FileText, 
  Hexagon, 
  ArrowUpRight 
} from "lucide-react";

export default function FeaturesJob() {
  const features = [
    {
      id: 1,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: <Search className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 2,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: <TrendingUp className="w-5 h-5 text-pink-400" />,
    },
    {
      id: 3,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: <BarChart4 className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 4,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: <Bookmark className="w-5 h-5 text-pink-400" />,
    },
    {
      id: 5,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: <MousePointerClick className="w-5 h-5 text-pink-400" />,
    },
    {
      id: 6,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: <FileText className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 7,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: <Hexagon className="w-5 h-5 text-pink-400" />,
    },
    {
      id: 8,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: <ArrowUpRight className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0c] text-white font-sans flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="text-center max-w-3xl mx-auto mb-20 z-10">
        {/* Blue Square Bullet + FEATURES JOB */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-4">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm inline-block" />
          Features Job
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm inline-block" />
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
          Everything you need <br />
          to succeed
        </h2>
      </div>

      {/* ================= FEATURES GRID ================= */}
      {/* ইমেজের মতো পারফেক্ট ৪-কলাম লেআউট (ডেস্কটপে) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 z-10 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex items-start gap-4 group"
          >
            {/* Icon Wrapper (ইমেজের মতো ডার্ক গ্লসি বক্স এবং নিখুঁত রাউন্ডেড কর্নার) */}
            <div className="flex items-center justify-center w-14 h-14 bg-[#111115] border border-zinc-800/50 rounded-2xl shrink-0 transition-colors duration-300 group-hover:border-zinc-700/80 shadow-md">
              {feature.icon}
            </div>

            {/* Content (Title + Description) */}
            <div className="flex flex-col pt-1">
              <h3 className="text-base font-medium text-zinc-200 mb-1.5 tracking-wide transition-colors duration-300 group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 font-normal leading-relaxed tracking-normal max-w-[220px]">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট লাইট (ডিজাইন লাক্সারি ভাইব দেওয়ার জন্য) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}