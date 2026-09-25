"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { useWorkout } from "@/Context/WorkoutContext";

const Navbar = () => {
  const { plan, saved } = useWorkout();

  return (
    <div className="border-b border-base-content/10">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:shadow-md">
            <Image src={Logo} alt="FitLog Logo" width={28} height={28} />
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-base-content">
            FITLOG
          </h2>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          <li>
            <Link
              href="/"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-[#c2f800] transition-all duration-300 hover:bg-linear-to-r hover:from-[#c6d490] hover:to-[#a8d900] hover:text-black hover:shadow-[0_4px_15px_rgba(194,248,0,0.18)]"
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
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:bg-base-200"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-xs font-bold text-black">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
