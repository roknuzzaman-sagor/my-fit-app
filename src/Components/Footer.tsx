import React from "react";

import footer from "@/assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="border-t border-white/15">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 py-10 md:flex-row">
        <div className="flex items-center gap-4">
          <Image src={footer} alt="footer image" width={30} height={30} />
          <h1 className="text-xl font-bold tracking-wide text-base-content">
            FITLOG
          </h1>
        </div>

        <div>
          <p className="text-center text-sm text-base-content/60 md:text-right">
            © 2026 FitLog - Workout Library, Train hard, log honest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
