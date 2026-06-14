import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import Image from 'next/image';
import { Briefcase, MapPin, DollarSign, Calendar, ArrowLeft, CheckCircle2, ShieldCheck, Gift } from "lucide-react";
import Link from 'next/link';

const JobDetailsPage = async ({ params }) => {
  // Next.js-এর স্ট্যান্ডার্ড নিয়ম অনুযায়ী params রেজলভ করা হচ্ছে
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const job = await getJobById(id);

  // সেফটি চেক: যদি কোনো কারণে ব্যাকএন্ড থেকে ডেটা না আসে
  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-400 text-sm font-medium">Job description could not be loaded.</p>
        <Link href="/jobs" className="text-xs text-purple-400 flex items-center gap-1.5 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Career Portal
        </Link>
      </div>
    );
  }

  // টেক্সটের ভেতরের '\n' বা নিউ লাইনগুলোকে ভেঙে প্রফেশনাল লিস্ট আকারে দেখানোর হেল্পার ফাংশন
  const renderListItems = (textData, IconComponent, iconColorClass) => {
    if (!textData) return null;
    return textData.split('\n').map((item, index) => (
      <li key={index} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
        <IconComponent className={`w-4 h-4 mt-0.5 shrink-0 ${iconColorClass}`} />
        <span>{item}</span>
      </li>
    ));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* গ্লোবাল অ্যাম্বিয়েন্ট ব্যাকগ্রাউন্ড লাইট */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* 🔙 ব্যাক বাটন */}
        <Link 
          href="/jobs" 
          className="w-fit flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-purple-400 transition-colors group mb-2"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Careers
        </Link>

        {/* 🏢 মেইন হেডার কার্ড */}
        <div className="w-full bg-gradient-to-br from-[#121214] to-[#18181b] border border-neutral-800/80 p-6 sm:p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* কোম্পানি লোগো কন্টেইনার */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0 p-2 shadow-inner">
              <Image
                src={job?.companyLogo || "/placeholder-logo.png"}
                alt={`${job?.companyName || "Company"} Logo`}
                fill
                priority
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className="text-[10px] bg-purple-950/40 text-purple-300 border border-purple-900/40 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-widest inline-block mb-1.5">
                {job?.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-neutral-100">
                {job?.title}
              </h1>
              <p className="text-sm font-medium text-neutral-400 mt-0.5">
                at <span className="text-neutral-200">{job?.companyName}</span>
              </p>
            </div>
          </div>

          {/* অ্যাপ্লাই বাটন ও ডেডলাইন কন্টেইনার */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t border-neutral-800/60 md:border-none">
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-xl border border-neutral-800">
              <Calendar className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Deadline: <strong className="text-neutral-300 font-medium">{job?.deadline}</strong></span>
            </div>
            <button 
              type="button" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 border border-purple-500 rounded-xl shadow-[0_4px_20px_rgba(147,51,234,0.3)] transition-all cursor-pointer"
            >
              Apply to Position
            </button>
          </div>
        </div>

        {/* 📊 কুইক মেটা ব্যাজেস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 bg-neutral-900 rounded-xl text-purple-400 border border-neutral-800">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Location</p>
              <p className="text-xs font-semibold text-neutral-200 mt-0.5">{job?.location}</p>
            </div>
          </div>

          <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 bg-neutral-900 rounded-xl text-purple-400 border border-neutral-800">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Work Mode</p>
              <p className="text-xs font-semibold text-neutral-200 mt-0.5 capitalize">{job?.locationType} ({job?.type})</p>
            </div>
          </div>

          <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 bg-neutral-900 rounded-xl text-purple-400 border border-neutral-800">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Compensation</p>
              <p className="text-xs font-semibold text-purple-300 mt-0.5">
                {job?.salary?.min}k–{job?.salary?.max}k / {job?.salary?.currency}
              </p>
            </div>
          </div>
        </div>

        {/* 📝 ডেসক্রিপশন ডিটেইলস সেকশন */}
        <div className="w-full bg-[#121214] border border-neutral-800/80 p-6 sm:p-8 rounded-[2rem] shadow-xl flex flex-col gap-8">
          
          {/* ১. রেসপনসিবিলিটি (Core Responsibilities) */}
          <div>
            <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2 mb-4">
              <span className="w-1.5 h-4 bg-purple-500 rounded-full" />
              Core Responsibilities
            </h3>
            <ul className="flex flex-col gap-3.5">
              {renderListItems(job?.description?.responsibilities, CheckCircle2, "text-purple-400")}
            </ul>
          </div>

          <hr className="border-neutral-800/60" />

          {/* ২. রিকোয়ারমেন্ট (Job Requirements) */}
          <div>
            <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2 mb-4">
              <span className="w-1.5 h-4 bg-purple-500 rounded-full" />
              Requirements & Qualifications
            </h3>
            <ul className="flex flex-col gap-3.5">
              {renderListItems(job?.description?.requirements, ShieldCheck, "text-emerald-400")}
            </ul>
          </div>

          <hr className="border-neutral-800/60" />

          {/* ৩. বেনিফিটস (Compensations & Benefits) */}
          <div>
            <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2 mb-4">
              <span className="w-1.5 h-4 bg-purple-500 rounded-full" />
              Perks & Corporate Benefits
            </h3>
            <ul className="flex flex-col gap-3.5">
              {renderListItems(job?.description?.benefits, Gift, "text-amber-400")}
            </ul>
          </div>

        </div>

        {/* 🔒 নিচে মেটা টোকেন আইডি ট্র্যাকিং */}
        <div className="w-full bg-[#0a0a0c] border border-neutral-800/40 rounded-2xl px-4 py-3 font-mono text-[10px] text-neutral-500 flex justify-between items-center shadow-inner">
          <span>SYSTEM VERIFIED ROUTE</span>
          <span>ID Token: <span className="text-purple-400/80">{id}</span></span>
        </div>

      </div>
    </div>
  );
};

export default JobDetailsPage;