"use client";

import React from "react";
import { motion } from "motion/react";
import {
  FiBriefcase,
  FiBarChart2,
  FiSearch,
  FiStar,
} from "react-icons/fi";

export default function GlobeStats() {
  const stats = [
    {
      id: 1,
      icon: <FiBriefcase className="text-xl text-zinc-400 group-hover:text-white transition-colors" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: <FiBarChart2 className="text-xl text-zinc-400 group-hover:text-white transition-colors" />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <FiSearch className="text-xl text-zinc-400 group-hover:text-white transition-colors" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <FiStar className="text-xl text-zinc-400 group-hover:text-white transition-colors" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 pb-16 pt-32">
      
      {/* ================= BACKGROUND GLOBE & NEON GLOW ================= */}
      {/* w-full h-full দিয়ে পুরো সেকশন জুড়ে ব্যাকগ্রাউন্ড কভার করা হয়েছে */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* গ্লোবের পেছনের গ্লোয়িং নিওন আভা */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-indigo-500/10 to-transparent blur-[140px]" />
          
          {/* মেইন গ্লোব ইমেজ (bg-cover এবং কাস্টম মাস্কিং) */}
          <div 
            className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-75"
            style={{
              backgroundImage: "url('/globe.png')",
              // চারপাশের এজ হাইড করার জন্য আরও বড় রেডিয়াসের রেডিয়াল মাস্ক এবং লিনিয়ার মাস্ক মিক্স করা হয়েছে
              maskImage: "radial-gradient(circle at center, black 20%, transparent 75%), linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 75%), linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in"
            }}
          />
        </div>
      </div>

      {/* ব্যাকগ্রাউন্ড নিচের ডার্ক ওভারলে */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative z-20 flex flex-col items-center justify-between w-full max-w-6xl mx-auto h-full flex-1">

        {/* ================= HEADER (GLOBE CENTERED) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mt-auto mb-16 sm:mb-24 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-zinc-300 leading-snug">
            Assisting over{" "}
            <span className="font-semibold text-white">
              15,000 job seekers
            </span>{" "}
            <br />
            find their dream positions.
          </h2>
        </motion.div>

        {/* ================= STATS GRID ================= */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ 
                y: -5,
                backgroundColor: "#111114",
                borderColor: "#222226"
              }}
              className="bg-[#0c0c0e]/90 backdrop-blur-md border border-[#141416] rounded-2xl p-7 flex flex-col justify-between min-h-[190px] transition-all duration-300 group cursor-pointer shadow-2xl"
            >
              {/* ICON */}
              <div className="w-fit p-1">
                {stat.icon}
              </div>

              {/* TEXT */}
              <div className="mt-8">
                <h3 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-500 font-normal tracking-wide">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}