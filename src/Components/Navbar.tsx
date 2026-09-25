"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/assets/logo.png";
import { useWorkout } from "@/Context/WorkoutContext";

const Navbar = () => {
  const { plan, saved } = useWorkout();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="border-b border-base-content/10">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">

       
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:shadow-md">
            <Image
              src={Logo}
              alt="FitLog Logo"
              width={28}
              height={28}
            />
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-base-content">
            FITLOG
          </h2>
        </Link>

       
        <ul className="hidden items-center gap-2 md:flex">
          <li>
            <Link
              href="/#library"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-[#c2f800]"
            >
              Workouts
            </Link>
          </li>

          <li>
            <Link
              href="/my-plan"
              className="rounded-xl px-5 py-2.5 text-sm font-bold"
            >
              My Plan
            </Link>
          </li>
        </ul>

      
        <div className="flex items-center gap-2">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:bg-base-200"
          >
            Plan

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-xs font-bold text-black">
              {mounted ? plan.length : 0}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:bg-base-200"
          >
            Saved

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-xs font-bold text-black">
              {mounted ? saved.length : 0}
            </span>
          </Link>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;