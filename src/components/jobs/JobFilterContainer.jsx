"use client";
import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Briefcase, MapPin, Layers, ChevronDown, RefreshCw } from "lucide-react";

export default function JobFilterContainer({ currentFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/jobs?${params.toString()}`, { scroll: false });
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push("/jobs", { scroll: false });
    });
  };

  const hasActiveFilters = Object.values(currentFilters).some(val => val !== "all" && val !== "");

  return (
    <div className={`w-full bg-[#121215]/90 border border-neutral-800/60 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 relative overflow-hidden group mb-10 transition-opacity duration-300 ${isPending ? "opacity-70" : "opacity-100"}`}>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/5 rounded-full blur-[50px] pointer-events-none" />

      {/* 🔍 সার্চ ইনপুট */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search roles, skills, or tech stacks (e.g., React, Node, C++)..."
          defaultValue={currentFilters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full bg-[#0a0a0c] border border-neutral-800/80 focus:border-purple-500/80 text-neutral-200 pl-11 pr-4 py-3.5 rounded-2xl outline-none text-sm tracking-wide shadow-inner transition-all duration-300 placeholder:text-neutral-600"
        />
      </div>

      {/* ⚙️ ড্রপডাউন গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ক্যাটাগরি */}
        <div className="relative group/select">
          <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none z-10" />
          <select
            value={currentFilters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full bg-[#0a0a0c] border border-neutral-800/80 text-neutral-300 pl-11 pr-10 py-3.5 rounded-xl outline-none text-xs font-semibold appearance-none cursor-pointer"
          >
            <option value="all" className="bg-[#121215]">All Categories</option>
            <option value="development" className="bg-[#121215]">Development</option>
            <option value="design" className="bg-[#121215]">Design</option>
            <option value="marketing" className="bg-[#121215]">Marketing</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
        </div>

        {/* জব টাইপ */}
        <div className="relative group/select">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none z-10" />
          <select
            value={currentFilters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full bg-[#0a0a0c] border border-neutral-800/80 text-neutral-300 pl-11 pr-10 py-3.5 rounded-xl outline-none text-xs font-semibold appearance-none cursor-pointer"
          >
            <option value="all" className="bg-[#121215]">All Job Types</option>
            <option value="full-time" className="bg-[#121215]">Full-time</option>
            <option value="part-time" className="bg-[#121215]">Part-time</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
        </div>

        {/* ওয়ার্ক মোড */}
        <div className="relative group/select">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none z-10" />
          <select
            value={currentFilters.locationType}
            onChange={(e) => handleFilterChange("locationType", e.target.value)}
            className="w-full bg-[#0a0a0c] border border-neutral-800/80 text-neutral-300 pl-11 pr-10 py-3.5 rounded-xl outline-none text-xs font-semibold appearance-none cursor-pointer"
          >
            <option value="all" className="bg-[#121215]">All Work Modes</option>
            <option value="on-site" className="bg-[#121215]">On-site</option>
            <option value="remote" className="bg-[#121215]">Remote</option>
            <option value="hybrid" className="bg-[#121215]">Hybrid</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      {/* রিসেট অ্যাকশন বার */}
      {hasActiveFilters && (
        <div className="flex items-center justify-end pt-2 border-t border-neutral-800/60 text-xs text-neutral-400 font-medium">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider text-[10px] bg-purple-950/20 border border-purple-900/40 hover:border-purple-500 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isPending ? "animate-spin" : ""}`} />
            Clear Active Filters
          </button>
        </div>
      )}
    </div>
  );
}