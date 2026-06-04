"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";

export default function MyNavbar() {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const navLink =
    "relative text-sm text-zinc-300 transition-all duration-300 hover:text-white";

  // ================= SIGN OUT =================
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/auth/signIn";
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#121212]/90 text-white backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {/* TOP BAR */}
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              width={80}
              height={80}
              alt="logo"
              className="object-contain"
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center">
            {/* MAIN WRAPPER */}
            <div className="flex items-center gap-3">
              {/* NAVIGATION BOX */}
              <div className="flex items-center gap-1 rounded-2xl border border-zinc-700/50 bg-white/[0.04] px-2 py-1 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <a href={"/"}
                  className={`${navLink} rounded-xl px-4 py-2 hover:bg-white/10`}
                >
                  Browse Jobs
                </a>

                <a
                  className={`${navLink} rounded-xl px-4 py-2 hover:bg-white/10`}
                >
                  Company
                </a>

                <a
                  className={`${navLink} rounded-xl px-4 py-2 hover:bg-white/10`}
                >
                  Pricing
                </a>
              </div>  
                  
                     {/* RIGHT SIDE */}
                  <div className="flex items-center gap-3 border-l border-zinc-700 px-3">
                  
                    {isPending ? (
                      <div className="px-4 py-2 text-sm text-zinc-500">
                        Loading...
                      </div>
                    ) : user ? (
                      <>
                        {/* USER CARD */}
                        <div className="flex items-center gap-2 rounded-2xl border border-zinc-700/50 bg-white/[0.04] px-3 py-2 backdrop-blur-xl">

                          {/* AVATAR */}
                          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
                            {user?.image ? (
                              <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-semibold uppercase text-white">
                                {user?.name?.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* NAME */}
                          <span className="whitespace-nowrap text-sm text-zinc-200">
                            Hi, {user?.name}
                          </span>
                        </div>

                        {/* SIGN OUT */}
                        <Button
                          variant="ghost"
                          className="h-[42px] px-4 text-red-400 transition-all hover:text-red-300"
                          onPress={handleSignOut}
                        >
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <a
                        href="/auth/signIn"
                        className="px-3 py-2 text-sm text-indigo-400 transition-all hover:text-indigo-300"
                      >
                        Sign In
                      </a>
                    )}

                    {/* CTA BUTTON */}
                    <a className="flex items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-200">
                      Get Started
                    </a>
                  </div>

      
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl text-zinc-300 transition hover:text-white md:hidden"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            open ? "max-h-[600px] pb-4" : "max-h-0"
          }`}
        >
          <div className="space-y-2 pt-3">
            {/* MOBILE NAV BOX */}
            <div className="rounded-2xl border border-zinc-700/50 bg-white/[0.04] p-2 backdrop-blur-xl">
              <a className="block rounded-xl px-3 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white">
                Browse Jobs
              </a>

              <a className="block rounded-xl px-3 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white">
                Company
              </a>

              <a className="block rounded-xl px-3 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white">
                Pricing
              </a>
            </div>

            {/* USER SECTION */}
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-2xl border border-zinc-700/50 bg-white/[0.04] px-3 py-3 backdrop-blur-xl">
                  {/* AVATAR */}
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold uppercase text-white">
                        {user?.name?.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* USER INFO */}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user?.name}
                    </p>

                    <p className="text-xs text-zinc-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* SIGN OUT */}
                <button
                  onClick={handleSignOut}
                  className="block w-full rounded-2xl border border-red-500/20 bg-red-500/10 py-2.5 text-center text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <a
                href="/auth/signIn"
                className="block rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2.5 text-center text-sm text-indigo-400 transition hover:bg-indigo-500/20"
              >
                Sign In
              </a>
            )}

            {/* CTA */}
            <a className="block rounded-2xl bg-white py-2.5 text-center text-sm font-semibold text-black transition hover:bg-zinc-200">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}