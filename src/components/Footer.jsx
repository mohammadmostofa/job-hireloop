import React from "react";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#09090b] text-zinc-400 text-sm border-t border-zinc-900/50 pt-16 pb-8 px-6 sm:px-12 md:px-16 select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[350px]">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">

          {/* BRAND */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/10 group-hover:scale-105 transition-transform">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>

              <span className="font-bold text-xl tracking-tight text-white group-hover:text-purple-400 transition-colors">
                Job HireLoop
              </span>
            </a>

            <p className="text-zinc-500 max-w-sm leading-relaxed text-[13px]">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* LINKS */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">

            <div className="flex flex-col gap-4">
              <h3 className="text-[#5c64f2] font-semibold uppercase text-[13px] tracking-wide">
                Product
              </h3>
              <ul className="space-y-2 text-[13px]">
                {["Job discovery", "Worker AI", "Companies", "Salary data"].map((item) => (
                  <li key={item}>
                    <a className="hover:text-zinc-200 transition-colors" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[#5c64f2] font-semibold uppercase text-[13px] tracking-wide">
                Navigation
              </h3>
              <ul className="space-y-2 text-[13px]">
                {["Help center", "Career library", "Contact"].map((item) => (
                  <li key={item}>
                    <a className="hover:text-zinc-200 transition-colors" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[#5c64f2] font-semibold uppercase text-[13px] tracking-wide">
                Resources
              </h3>
              <ul className="space-y-2 text-[13px]">
                {["Brand Guideline", "Newsroom"].map((item) => (
                  <li key={item}>
                    <a className="hover:text-zinc-200 transition-colors" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-10 border-t border-zinc-900/40">

          {/* SOCIAL */}
          <div className="flex items-center gap-3">

            {/* Facebook */}
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-white transition-all hover:-translate-y-0.5"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>

            {/* Pinterest */}
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#4f46e5] text-white transition-all hover:scale-105"
            >
              <FaPinterestP className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-white transition-all hover:-translate-y-0.5"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>

          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-zinc-500 text-[12px] text-center sm:text-right">
            <span>© 2026 Job HireLoop</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms & Privacy Policy
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;