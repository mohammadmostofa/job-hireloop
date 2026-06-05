import React from "react";
import { Building2 } from "lucide-react";

const TopCompanies = () => {
  const companies = [
    { id: 1, name: "Google Inc.", category: "Technology • Mountain View", jobs: 24 },
    { id: 2, name: "Meta Platforms", category: "Social Media • Menlo Park", jobs: 18 },
    { id: 3, name: "Stripe", category: "Fintech • San Francisco", jobs: 12 },
    { id: 4, name: "Tesla", category: "Automotive • Austin", jobs: 31 },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <h2 className="text-lg font-semibold text-[#f4f4f5]">My Top Companies</h2>
        <button className="text-xs text-[#a1a1aa] hover:text-white transition-colors font-medium">View all</button>
      </div>
      
      {/* 
        h-[258px] ব্যবহারের মাধ্যমে উচ্চতা বাম পাশের টেবিলের সমান লক করা হয়েছে।
        flex-1 এবং justify-between এর ফলে ভেতরের গ্যাপগুলো অটোমেটিক সুন্দরভাবে ম্যানেজ হবে।
      */}
      <div className="rounded-xl bg-[#161618] border border-[#27272a] p-3.5 h-[258px] flex flex-col justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="flex items-center justify-between gap-3 p-1.5 rounded-lg hover:bg-[#1f1f22] transition-colors"
            >
              
              {/* বাম পাশের কন্টেন্ট র্যাপার */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-ful h-full rounded-lg bg-[#27272a] border border-[#3f3f46]/30 flex items-center justify-center text-[#a1a1aa] flex-shrink-0">
                  <Building2 size={14} />
                </div>
                
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-[#f4f4f5] truncate tracking-tight">
                    {company.name}
                  </h4>
                  <p className="text-[10px] text-[#71717a] mt-0.5 truncate">
                    {company.category}
                  </p>
                </div>
              </div>
              
              {/* ডান পাশের অ্যাক্টিভ জবস কাউন্টার */}
              <div className="text-right flex-shrink-0 pl-1">
                <span className="text-xs font-bold text-[#f4f4f5] block tracking-tight">
                  {company.jobs}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#71717a] font-semibold block mt-0.5">
                  Active Jobs
                </span>
              </div>

            </div>
          ))}
        </div>
        
        <button className="w-full py-2 px-4 rounded-lg border border-[#27272a] bg-transparent text-xs font-medium text-[#e4e4e7] hover:bg-[#27272a] hover:border-[#3f3f46] transition-all text-center">
          View All Companies
        </button>
      </div>
    </div>
  );
};  

export default TopCompanies;