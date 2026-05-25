"use client";
import React from "react";
import {
  FiBriefcase,
  FiBarChart2,
  FiSearch,
  FiStar,
} from "react-icons/fi";

const BannerPage = () => {
   const stats = [
      {
        id: 1,
        icon: <FiBriefcase className="text-xl sm:text-2xl text-neutral-300" />,
        value: "50K",
        label: "Active Jobs",
      },
      {
        id: 2,
        icon: <FiBarChart2 className="text-xl sm:text-2xl text-neutral-300" />,
        value: "12K",
        label: "Companies",
      },
      {
        id: 3,
        icon: <FiSearch className="text-xl sm:text-2xl text-neutral-300" />,
        value: "2M",
        label: "Job Seekers",
      },
      {
        id: 4,
        icon: <FiStar className="text-xl sm:text-2xl text-neutral-300" />,
        value: "97%",
        label: "Satisfaction Rate",
      },
    ];
  return (
    <div>
       
       <section className="relative w-full  text-white min-h-[85vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[180px] sm:h-[250px] bg-indigo-600/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto text-center z-10 flex flex-col items-center">

        {/* badge */}
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 text-[10px] sm:text-xs text-zinc-400">
          <span>💼</span>
          <span className="text-white font-semibold">50,000+</span>
          NEW JOBS THIS MONTH
        </div>

        {/* heading */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-snug sm:leading-tight max-w-3xl">
          Find Your Dream Job Today
        </h1>

        {/* subtitle */}
        <p className="text-zinc-400 text-xs sm:text-sm md:text-lg max-w-2xl mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role faster.
        </p>

        {/* search bar */}
        <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-2xl sm:rounded-full p-2 flex flex-col sm:flex-row gap-2 backdrop-blur-md">

          {/* job input */}
          <div className="flex items-center gap-3 flex-1 px-3 sm:px-4 py-2 sm:py-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder-zinc-500"
              placeholder="Job title, skill or company"
            />
          </div>

          {/* location input */}
          <div className="flex items-center gap-3 flex-1 px-3 sm:px-4 py-2 sm:py-3 border-t sm:border-t-0 sm:border-l border-zinc-800">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <input
              className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder-zinc-500"
              placeholder="Location or Remote"
            />
          </div>

          {/* button */}
          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl sm:rounded-full transition active:scale-95 text-sm">
            Search
          </button>
        </div>

        {/* trending */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2">

          <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
            Trending:
          </span>

          <a className="text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white">
            Product Designer
          </a>

          <a className="text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white">
            AI Engineering
          </a>

          <a className="text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white">
            DevOps Engineer
          </a>

        </div>

      </div>
       </section> 

     {/* static page */}
      <section className="relative w-full bg-indigo-600/10  text-white overflow-hidden
       flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

      {/* ================= BACKGROUND GLOBE ================= */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover "
        style={{
          backgroundImage: "url('/globe.png')",
          backgroundPosition: "center center",
          opacity:1,
        }}
      />

      {/* ================= CLEAN GLOW ================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-indigo-500/10 blur-[160px] 
      rounded-full pointer-events-none z-0" />

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full">

        {/* ================= HEADING ================= */}
        <div className="text-center max-w-4xl mx-auto px-4 mb-10 sm:mb-14 lg:mb-16">

  {/* ================= HEADING ================= */}
  {/* ১. text-indigo-400 এর জায়গায় text-white এবং block সরিয়ে স্বাভাবিক ইনলাইন ফ্লো আনা হয়েছে */}
  <h2 className="text-2xl font-medium tracking-tight text-neutral-200 leading-snug max-w-3xl mx-auto">
    Assisting over{" "}
    <span className="font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
      15,000 job seekers <br />
    </span>{" "}
    find their dream positions.
  </h2>

  {/* ================= SUBTITLE ================= */}
  {/* ২. সাবটাইটেলটির ফন্ট সাইজ এবং উইডথ একটু কমানো হয়েছে যেন এটি হেডিংকে ওভারপাওয়ার না করে */}
  <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
    Helping professionals connect with leading companies and unlock
    career opportunities through a seamless modern hiring experience.
  </p>

</div>

        {/* ================= STATS GRID ================= */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 sm:mt-10">

          {stats.map((stat) => (
            <div
              key={stat.id}
              className="  bg-white/10  backdrop-blur-2xl  border border-white/10  rounded-3xl  p-6  hover:bg-white/15  hover:border-white/20  transition-all duration-300  shadow-[0_8px_32px_rgba(0,0,0,0.35)]  flex flex-col justify-between  min-h-[170px] ">

              {/* ICON */}
              <div className="w-fit p-3 rounded-2xl bg-white/10 border border-white/10">
                {stat.icon}
              </div>

              {/* TEXT */}
              <div className="mt-6">
                <h3 className="text-4xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-neutral-300">
                  {stat.label}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>

    </div>
  );
};

export default BannerPage;