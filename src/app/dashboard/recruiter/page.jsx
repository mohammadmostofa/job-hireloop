import { FileText, Users, Zap, CheckCircle2 } from "lucide-react";
import TopCompanies from "@/components/dashboard/TopCompanies";
import RecaruiterJobs from "./job/page";
import { getUserSession } from "@/lib/cors/session";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-[#09090b]/40 border border-zinc-800/80 p-5 rounded-xl shadow-md flex items-center justify-between backdrop-blur-md transition-all hover:border-zinc-700/60">
      <div className="space-y-1">
        <p className="text-xs font-medium text-[#71717a] tracking-wide uppercase">
          {title}
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-zinc-100">
          {value}
        </h3>
      </div>
      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
        {icon}
      </div>
    </div>
  );
};

const RecruiterDashboardHomePage = async () => {
  const user = await getUserSession();

  const statsData = [
    { id: 1, title: "Total Job Posts", value: "48", icon: <FileText size={16} /> },
    { id: 2, title: "Total Applicants", value: "1,284", icon: <Users size={16} /> },
    { id: 3, title: "Active Jobs", value: "18", icon: <Zap size={16} /> },
    { id: 4, title: "Jobs Closed", value: "32", icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-8 antialiased">
      <div className="max-w-[1400px] w-full mx-auto px-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f4f4f5] capitalize">
          Welcome back, {user?.name || "Recruiter"}
        </h2>

        <p className="text-xs sm:text-sm text-[#71717a] mt-1">
          Here is whats happening with your job posts today.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[1400px] mx-auto px-2">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto items-start px-2">
        <div className="w-full lg:col-span-8">
          <RecaruiterJobs />
        </div>

        <div className="w-full lg:col-span-4">
          <TopCompanies />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardHomePage;