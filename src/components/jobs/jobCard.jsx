import React from "react";
import { Card } from "@heroui/react";
import { Briefcase, MapPin, DollarSign, ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobPostCard({ job }) {
  // responsibilities টেক্সট থেকে প্রথম লাইনটি শর্ট ডেসক্রিপশন হিসেবে দেখানোর জন্য
  const shortDescription = job?.description?.responsibilities?.split("\n")[0] || "";

  // 🛠️ ডাইনামিক আইডি এক্সট্রাকশন (MongoDB এবং নরমাল আইডি—উভয় স্ট্রাকচারের জন্যই সেফ)
  const jobId = job?.触_id?.$oid || job?._id || job?.id;

  return (
    <Card className="max-w-[400px] relative overflow-hidden bg-gradient-to-br from-[#18181b] via-[#121214] to-[#09090b] border border-neutral-800/80 rounded-[2rem] p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] hover:-translate-y-2 transition-all duration-500 ease-out group">
      
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট লাইট (স্থায়ীভাবে ব্যাকগ্রাউন্ডে থাকবে, হোভারে গ্লো বাড়বে) */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/15 rounded-full blur-[65px] pointer-events-none group-hover:bg-purple-600/30 group-hover:scale-125 transition-all duration-700 ease-out" />
      
      {/* Card Header: কোম্পানি লোগো, নাম এবং ডেডলাইন */}
      <Card.Header className="flex flex-row items-center justify-between pb-4 border-b border-neutral-800/50 relative z-10">
        <div className="flex items-center gap-3">
          
          {/* লোগো কন্টেইনার (স্থায়ী মেটালিক গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড) */}
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700/60 shrink-0 p-2 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-out">
            <Image
              src={job?.companyLogo || "/placeholder-logo.png"}
              alt={`${job?.companyName || "Company"} Logo`}
              fill
              sizes="48px"
              priority={false}
              className="object-contain p-1.5"
            />
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-wide text-neutral-200 group-hover:text-white transition-colors duration-300">
              {job?.companyName}
            </h4>
            <span className="text-[10px] bg-neutral-800/50 text-neutral-400 border border-neutral-800/80 px-2 py-0.5 rounded-md font-semibold uppercase tracking-widest mt-0.5 inline-block">
              {job?.category}
            </span>
          </div>
        </div>
        
        {/* ডেডলাইন ব্যাজ */}
        <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-full text-[11px] font-medium text-neutral-400 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>{job?.deadline}</span>
        </div>
      </Card.Header>

      {/* Card Content: টাইটেল, ডেসক্রিপশন এবং ব্যাজসমূহ */}
      <Card.Content className="py-6 flex flex-col gap-5 relative z-10">
        <div>
          {/* টাইটেল: প্রিমিয়াম গ্রেডিয়েন্ট */}
          <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent group-hover:via-white group-hover:to-purple-300 transition-all duration-500 leading-snug">
            {job?.title}
          </h2>
          <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed font-normal tracking-wide">
            {shortDescription}
          </p>
        </div>

        {/* Badges Layout */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-800/80 px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>{job?.location}</span>
          </div>

          {/* Job Type Badge */}
          <div className="flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-800/80 px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-300">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span className="capitalize">{job?.locationType}</span>
          </div>

          {/* Salary Badge */}
          <div className="flex items-center gap-1.5 bg-purple-950/20 border border-purple-900/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-300">
            <DollarSign className="w-3.5 h-3.5 text-purple-400" />
            <span>
              {job?.salary?.min}k–{job?.salary?.max}k / {job?.salary?.currency}
            </span>
          </div>
        </div>
      </Card.Content>

      {/* Card Footer: অ্যানিমেটেড বাটন (ফিক্সড ডাইনামিক রাউট লিংক সহ) */}
      <Card.Footer className="pt-3 border-t border-neutral-800/50 relative z-10">
        <Link 
          href={`/jobs/${jobId}`} 
          className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-200 bg-gradient-to-r from-purple-900/45 to-purple-800/25 border border-purple-900/60 group-hover:from-purple-700 group-hover:to-purple-900 group-hover:border-purple-500 group-hover:text-white rounded-xl py-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:shadow-[0_4px_25px_rgba(147,51,234,0.35)] transition-all duration-500 ease-out cursor-pointer"
        >
          Apply Position
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out text-purple-300 group-hover:text-white" />
        </Link>
      </Card.Footer>

    </Card>  
  );
}