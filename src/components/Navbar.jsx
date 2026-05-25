"use client";
import Image from "next/image";
import { useState } from "react";

export default function MyNavbar() {
  const [open, setOpen] = useState(false);

  const navLink =
    "relative text-sm text-zinc-300 transition duration-300 hover:text-white";

  return (
    <nav className="w-full bg-[#121212]/90 backdrop-blur-md border-b
     border-zinc-800 text-white sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-10">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex items-center gap-3">
           <Image src={'/logo.png'} width={80} height={80} alt="logo" />

          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center">

            {/* GROUP CONTAINER */}
            <div className="flex items-center gap-1 border border-zinc-700/50 rounded-2xl px-2 py-1 bg-white/5 backdrop-blur-md">

              <a className={`${navLink} px-4 py-2 rounded-xl hover:bg-white/10`}>
                Browse Jobs
              </a>

              <a className={`${navLink} px-4 py-2 rounded-xl hover:bg-white/10`}>
                Company
              </a>

              <a className={`${navLink} px-4 py-2 rounded-xl hover:bg-white/10`}>
                Pricing
              </a>

              {/* divider */}
              <div className="w-px h-5 bg-zinc-700 mx-2" />

              <a className="text-sm text-indigo-400 hover:text-indigo-300 px-4 py-2 rounded-xl hover:bg-indigo-500/10 transition">
                Sign In
              </a>

              <a className="bg-white text-zinc-900 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-zinc-200 hover:scale-[1.03] transition">
                Get Started
              </a>

            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-zinc-300 text-2xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[400px] pb-4" : "max-h-0"
          }`}
        >
          <div className="space-y-2 pt-2">

            <a className="block px-3 py-2 text-zinc-300 hover:bg-white/10 rounded-lg transition">
              Browse Jobs
            </a>

            <a className="block px-3 py-2 text-zinc-300 hover:bg-white/10 rounded-lg transition">
              Company
            </a>

            <a className="block px-3 py-2 text-zinc-300 hover:bg-white/10 rounded-lg transition">
              Pricing
            </a>

            <a className="block px-3 py-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition">
              Sign In
            </a>

            <a className="block text-center bg-white text-black py-2 rounded-xl font-semibold hover:bg-zinc-200 transition">
              Get Started
            </a>

          </div>
        </div>

      </div>
    </nav>
  );
}