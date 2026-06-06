"use client"
import React from 'react';
import { useSession } from '@/lib/auth-client';
import { FileText, Users, Zap, CheckCircle2 } from "lucide-react";
import TopCompanies from '@/components/dashboard/TopCompanies';
import RecentJobsDashboard from '@/components/dashboard/RecentApplications';

// প্রফেশনাল স্ট্যাটাস কার্ড
const StatCard = ({ icon, title, value }) => (
  <div className="flex flex-col gap-4 p-5 rounded-xl bg-[#121214] border border-[#232326] shadow-sm transition-all hover:border-[#2e2e33]">
    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1c1c1f] text-[#a1a1aa] border border-[#27272a]">
      {icon}
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="text-xs font-medium text-[#71717a] tracking-wide">{title}</p>
      <h3 className="text-2xl font-bold text-[#f4f4f5] tracking-tight">{value}</h3>
    </div>
  </div>
);

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
       
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09090b] text-white">
        <h2 className="text-sm font-medium text-[#71717a]">Loading dashboard...</h2>
      </div>
    );
  } 
  
  const user = session?.user;
   
  const statsData = [
    { id: 1, title: "Total Job Posts", value: "48", icon: <FileText size={16} /> },
    { id: 2, title: "Total Applicants", value: "1,284", icon: <Users size={16} /> },
    { id: 3, title: "Active Jobs", value: "18", icon: <Zap size={16} /> },
    { id: 4, title: "Jobs Closed", value: "32", icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-8 antialiased">
      {/* হেডার সেকশন */}
      <div className="max-w-[1400px] w-full mx-auto px-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f4f4f5] capitalize">
          Welcome back, {user?.name || "Recruiter"}
        </h2>
        <p className="text-xs sm:text-sm text-[#71717a] mt-1">Here is what's happening with your job posts today.</p>
      </div>

      {/* ৪টি কার্ড গ্রিড */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[1400px] mx-auto px-2">
        {statsData.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* টেবিল ও কোম্পানি সেকশন - ১২ কলাম গ্রিড লেআউট (৮:৪ রেশিও) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto items-start px-2">
        {/* টেবিল পার্ট - ১২ ভাগের ৮ ভাগ নেবে */}
        <div className="w-full lg:col-span-8">
          <RecentJobsDashboard/>
        </div>
        
        {/* কোম্পানি পার্ট - ১২ ভাগের ৪ ভাগ নেবে */}
        <div className="w-full lg:col-span-4">
          <TopCompanies />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardHomePage;