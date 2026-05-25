// "use client";

// import React from "react";
// import {
//   FiBriefcase,
//   FiBarChart2,
//   FiSearch,
//   FiStar,
// } from "react-icons/fi";

// export default function GlobeStats() {
//   const stats = [
//     {
//       id: 1,
//       icon: <FiBriefcase className="text-xl sm:text-2xl text-neutral-300" />,
//       value: "50K",
//       label: "Active Jobs",
//     },
//     {
//       id: 2,
//       icon: <FiBarChart2 className="text-xl sm:text-2xl text-neutral-300" />,
//       value: "12K",
//       label: "Companies",
//     },
//     {
//       id: 3,
//       icon: <FiSearch className="text-xl sm:text-2xl text-neutral-300" />,
//       value: "2M",
//       label: "Job Seekers",
//     },
//     {
//       id: 4,
//       icon: <FiStar className="text-xl sm:text-2xl text-neutral-300" />,
//       value: "97%",
//       label: "Satisfaction Rate",
//     },
//   ];

//   return (
//     <section className="relative w-full min-h-[750px] sm:min-h-[850px]  bg-indigo-600/10 
//      text-white overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

//       {/* ================= BACKGROUND GLOBE ================= */}
//       <div
//         className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover"
//         style={{
//           backgroundImage: "url('/globe.png')",
//           backgroundPosition: "center center",
//           opacity: 1,
//         }}
//       />

//       {/* ================= CLEAN GLOW ================= */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] lg:w-[950px] h-[350px] sm:h-[500px]
//        bg-indigo-500/10 blur-[160px] rounded-full pointer-events-none z-0" />

//       {/* ================= OVERLAY ================= */}
//       <div className="absolute inset-0 bg-black/40 z-10" />

//       {/* ================= CONTENT WRAPPER ================= */}
//       <div className="relative z-20 flex flex-col items-center justify-center w-full">

//         {/* ================= HEADING ================= */}
//         <div className="text-center max-w-4xl mx-auto px-4 mb-10 sm:mb-14 lg:mb-16">

//   {/* ================= HEADING ================= */}
//   {/* ১. text-indigo-400 এর জায়গায় text-white এবং block সরিয়ে স্বাভাবিক ইনলাইন ফ্লো আনা হয়েছে */}
//   <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-200 leading-snug max-w-3xl mx-auto">
//     Assisting over{" "}
//     <span className="font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
//       15,000 job seekers
//     </span>{" "}
//     find their dream positions.
//   </h2>

//   {/* ================= SUBTITLE ================= */}
//   {/* ২. সাবটাইটেলটির ফন্ট সাইজ এবং উইডথ একটু কমানো হয়েছে যেন এটি হেডিংকে ওভারপাওয়ার না করে */}
//   <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
//     Helping professionals connect with leading companies and unlock
//     career opportunities through a seamless modern hiring experience.
//   </p>

// </div>

//         {/* ================= STATS GRID ================= */}
//         <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 sm:mt-10">

//           {stats.map((stat) => (
//             <div
//               key={stat.id}
//               className="  bg-white/10  backdrop-blur-2xl  border border-white/10  rounded-3xl  p-6  hover:bg-white/15  hover:border-white/20  transition-all duration-300  shadow-[0_8px_32px_rgba(0,0,0,0.35)]  flex flex-col justify-between  min-h-[170px] ">

//               {/* ICON */}
//               <div className="w-fit p-3 rounded-2xl bg-white/10 border border-white/10">
//                 {stat.icon}
//               </div>

//               {/* TEXT */}
//               <div className="mt-6">
//                 <h3 className="text-4xl font-bold text-white">
//                   {stat.value}
//                 </h3>

//                 <p className="mt-2 text-sm text-neutral-300">
//                   {stat.label}
//                 </p>
//               </div>

//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// }