"use client";
import React, { useState, useMemo } from "react";
import { Search, Briefcase, MapPin, Layers } from "lucide-react";
import JobPostCard from "@/components/jobs/jobCard";

export default function FilterableJobGrid({ initialJobs }) {
  // ফিল্টার এবং সার্চ স্টেটসমূহ
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocationType, setSelectedLocationType] = useState("all");

  // রিকোয়ারমেন্ট, রেসপনসিবিলিটি, টাইটেল ও কোম্পানি ডিপেন্ডেন্ট সার্চ লজিক
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const searchTxt = searchQuery.toLowerCase();

      // ডেটার সুনির্দিষ্ট টেক্সট ফিল্ডসমূহ
      const titleText = job?.title?.toLowerCase() || "";
      const companyText = job?.companyName?.toLowerCase() || "";
      const requirementsText = job?.description?.requirements?.toLowerCase() || "";
      const responsibilitiesText = job?.description?.responsibilities?.toLowerCase() || "";

      // সার্চ ম্যাচিং লজিক
      const matchesSearch =
        titleText.includes(searchTxt) ||
        companyText.includes(searchTxt) ||
        requirementsText.includes(searchTxt) ||
        responsibilitiesText.includes(searchTxt);

      // ড্রপডাউন ম্যাচিং ফিল্ডসমূহ
      const matchesCategory =
        selectedCategory === "all" || job?.category === selectedCategory;

      const matchesType =
        selectedType === "all" || job?.type === selectedType;

      const matchesLocationType =
        selectedLocationType === "all" ||
        job?.locationType?.toLowerCase() === selectedLocationType.toLowerCase();

      return matchesSearch && matchesCategory && matchesType && matchesLocationType;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedLocationType, initialJobs]);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* 🔍 সার্চ ও ফিল্টার প্যানেল UI */}
      <div className="w-full bg-[#121214] border border-neutral-800/80 p-5 rounded-[2rem] shadow-xl flex flex-col gap-4">
        
        {/* সার্চ ইনপুট ফিল্ড */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by title, company, or requirements (e.g., C++, React, Google)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181b] border border-neutral-800 focus:border-purple-500 text-neutral-200 pl-12 pr-4 py-3.5 rounded-2xl outline-none text-sm transition-all duration-300"
          />
        </div>

        {/* ড্রপডাউন অপশনসমূহ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* ১. ক্যাটাগরি */}
          <div className="relative">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#18181b] border border-neutral-800 focus:border-purple-500 text-neutral-300 pl-10 pr-4 py-3 rounded-xl outline-none text-xs font-medium appearance-none cursor-pointer capitalize"
            >
              <option value="all">All Categories</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          {/* ২. জব টাইপ */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#18181b] border border-neutral-800 focus:border-purple-500 text-neutral-300 pl-10 pr-4 py-3 rounded-xl outline-none text-xs font-medium appearance-none cursor-pointer capitalize"
            >
              <option value="all">All Job Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
          </div>

          {/* ৩. লোকেশন টাইপ */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <select
              value={selectedLocationType}
              onChange={(e) => setSelectedLocationType(e.target.value)}
              className="w-full bg-[#18181b] border border-neutral-800 focus:border-purple-500 text-neutral-300 pl-10 pr-4 py-3 rounded-xl outline-none text-xs font-medium appearance-none cursor-pointer capitalize"
            >
              <option value="all">All Work Modes</option>
              <option value="on-site">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* ফিল্টার কাউন্টার ও রিসেট বাটন */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/40 text-xs text-neutral-400">
          <span>Matching positions: <strong className="text-purple-400 font-semibold">{filteredJobs.length}</strong></span>
          {(searchQuery || selectedCategory !== "all" || selectedType !== "all" || selectedLocationType !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
                setSelectedLocationType("all");
              }}
              className="text-purple-400 hover:underline cursor-pointer font-medium bg-transparent border-none outline-none"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* 💼 ৩-কলাম রেসপনসিভ গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-4 w-full">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((singleJob) => (
            <JobPostCard 
              key={singleJob?._id?.$oid || singleJob?._id || singleJob?.title} 
              job={singleJob} 
            />
          ))
        ) : (
          <p className="text-neutral-500 col-span-full py-16 text-center text-sm">
            No jobs found matching your criteria.
          </p>
        )}
      </div>

    </div>
  );
}