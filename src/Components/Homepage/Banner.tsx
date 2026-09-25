import Image from "next/image";
import React from "react";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-base-100 py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-[#222630] px-6 py-10 shadow-xl md:grid-cols-2 md:px-10 md:py-12">
         
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-bold tracking-[0.25em] text-[#c2f800]">
              WORKOUT LIBRARY
            </p>

            <h1 className="mb-5 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              TRAIN WITH INTENT.LOG
               EVERY SET.
            </h1>

            <p className="mb-6 max-w-lg text-sm leading-6 text-white/60 md:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center gap-3 rounded-xl bg-[#c2f800] px-5 py-3 text-sm font-extrabold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#d2ff3d] hover:shadow-[0_8px_25px_rgba(194,248,0,0.2)]"
            >
              BROWSE WORKOUTS
              
            </a>
          </div>

          
          <div className="flex items-center justify-center md:justify-end">
            <Image
              src={banner}
              alt="FitLog workout banner"
              className="h-55 w-full object-contain sm:h-65 md:h-75"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
