"use client";

import React, { useState, useEffect } from "react";
import { getCompanyJobs } from "@/lib/api/jobs";
import {
  Briefcase,
  MapPin,
  Tag,
  Eye,
  SquarePen,
  Trash2,
} from "lucide-react";

const RecentJobsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const companyId = "comp_98745";

        const data = await getCompanyJobs(companyId);

        setJobs(Array.isArray(data) ? data : data ? [data] : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "inactive":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "draft":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20";
    }
  };

  const handleDelete = (id) => {
    const ok = confirm("Delete this job?");
    if (!ok) return;

    setJobs((prev) => prev.filter((j) => (j._id || j.id) !== id));
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-400">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-[#121214]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Posted Jobs
          </h2>
          <p className="text-sm text-zinc-500">
            Latest job postings
          </p>
        </div>

        <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <Eye size={16} />
          View All
        </button>
      </div>

      {/* TABLE WRAPPER (desktop + scroll mobile) */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase">
              <th className="p-4 text-left">Job Title</th>
              <th className="p-4 text-left">Type / Category</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id || job.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-900/30"
              >
                {/* Title */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <Briefcase size={18} />
                    </div>
                    <span className="text-white font-medium">
                      {job.title}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="p-4 text-zinc-400">
                  <div>
                    <div className="text-white">{job.type}</div>
                    <div className="text-xs">{job.category}</div>
                  </div>
                </td>

                {/* Location */}
                <td className="p-4 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {job.location}
                  </div>
                </td>

                {/* Status */}
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusStyle(job.status)}`}>
                    {job.status}
                  </span>
                </td>

                {/* Action */}
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 bg-zinc-800 rounded-lg">
                      <Eye size={16} />
                    </button>

                    <button className="p-2 bg-zinc-800 rounded-lg">
                      <SquarePen size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(job._id || job.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="sm:hidden p-4 space-y-3">
        {jobs.map((job) => (
          <div
            key={job._id || job.id}
            className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Briefcase size={18} />
              </div>

              <div>
                <div className="text-white font-medium">
                  {job.title}
                </div>
                <div className="text-xs text-zinc-500">
                  {job.category}
                </div>
              </div>
            </div>

            <div className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
              <MapPin size={14} />
              {job.location}
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusStyle(job.status)}`}>
                {job.status}
              </span>

              <div className="flex gap-2">
                <button className="p-2 bg-zinc-800 rounded-lg">
                  <Eye size={16} />
                </button>

                <button className="p-2 bg-zinc-800 rounded-lg">
                  <SquarePen size={16} />
                </button>

                <button
                  onClick={() => handleDelete(job._id || job.id)}
                  className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentJobsDashboard;