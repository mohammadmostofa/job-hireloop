import React from "react";

export default function StatCard({ icon, title, value }) {
  return (
    
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-[#121214] border border-[#232326] shadow-sm transition-all hover:border-[#2e2e33]">
      
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1c1c1f] text-[#a1a1aa] border border-[#27272a] flex-shrink-0">
        {icon}
      </div>
      
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-xs font-medium text-[#71717a] tracking-wide truncate">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-[#f4f4f5] tracking-tight truncate">
          {value}
        </h3>
      </div>

    </div>
  );
}