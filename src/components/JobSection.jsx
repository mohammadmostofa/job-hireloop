"use client"; // Next.js App Router-এর জন্য এটি প্রয়োজন

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineCurrencyDollar, HiOutlineArrowRight } from 'react-icons/hi';

const JobSection = () => {
  const jobs = Array(6).fill({
    title: 'Frontend Developer',
    description: 'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25–€40/hour',
  });

  // প্যারেন্ট কন্টেইনারের জন্য অ্যানিমেশন ভ্যারিয়েন্ট (স্ট্যাগার্ড ইফেক্ট)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // প্রতিটি কার্ড একের পর এক আসবে
      },
    },
  };

  // প্রতিটি আলাদা উপাদানের (কার্ড/হেডিং) জন্য অ্যানিমেশন
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="bg-black text-white py-20 px-4 md:px-8 min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* হেডার সেকশন অ্যানিমেশন */}
      <motion.div 
        className="text-center max-w-3xl mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4">
          <motion.span 
            className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          ></motion.span>
          SMART JOB DISCOVERY
          <motion.span 
            className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          ></motion.span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          The roles you'd never <br /> find by searching
        </h2>
      </motion.div>

      {/* জব কার্ড গ্রিড (স্ক্রোলে আসলে অ্যানিমেশন ট্রিগার হবে) */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // স্ক্রোলে একবারই অ্যানিমেশন হবে
      >
        {jobs.map((job, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              borderColor: '#3f3f46',
              boxShadow: '0 20px 30px -10px rgba(99, 102, 241, 0.05)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="bg-[#121214] border border-[#1e1e22] rounded-2xl p-8 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-3 tracking-wide">{job.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {job.description}
              </p>
              
              {/* ট্যাগসমূহ */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="inline-flex items-center gap-1.5 bg-[#1a1a1e] text-zinc-300 text-xs px-3 py-1.5 rounded-full border border-zinc-800/50">
                  <HiOutlineLocationMarker className="text-indigo-400 text-sm" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#1a1a1e] text-zinc-300 text-xs px-3 py-1.5 rounded-full border border-zinc-800/50">
                  <HiOutlineBriefcase className="text-indigo-400 text-sm" />
                  {job.type}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#1a1a1e] text-zinc-300 text-xs px-3 py-1.5 rounded-full border border-zinc-800/50 w-full sm:w-auto">
                  <HiOutlineCurrencyDollar className="text-indigo-400 text-sm" />
                  {job.salary}
                </span>
              </div>
            </div>

            {/* অ্যাকশন বাটন উইথ অ্যারো অ্যানিমেশন */}
            <motion.button 
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors duration-200 self-start group"
              whileTap={{ scale: 0.95 }}
            >
              Apply Now 
              <motion.span
                variants={{
                  hover: { x: 5 }
                }}
                className="inline-block"
              >
                <HiOutlineArrowRight className="transform group-hover:translate-x-1 transition-transform duration-200" />
              </motion.span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* নিচের মেইন বাটন অ্যানিমেশন */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black font-medium text-sm px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors duration-200 shadow-lg"
        >
          View all job open
        </motion.button>
      </motion.div>

    </section>
  );
};

export default JobSection;