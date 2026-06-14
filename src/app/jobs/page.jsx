import FilterableJobGrid from "@/components/jobs/FilterableJobGrid";
import { getJob } from "@/lib/api/jobs";

export default async function JobsPage() {
  // ডাটাবেজ বা API থেকে জব ডেটা আনা হচ্ছে
  const jobs = (await getJob()) || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      {/* হেডার সেকশন: মোট জবের সংখ্যা দেখানোর জন্য */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Available Jobs</h1>
        <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-sm text-neutral-400">
          Total: {jobs.length} Positions
        </span>
      </div>

      {/* ফিল্টারেবল জব গ্রিড কন্টেইনার */}
      <div className="max-w-7xl mx-auto">
        <FilterableJobGrid initialJobs={jobs} />
      </div>
    </div>
  );
}