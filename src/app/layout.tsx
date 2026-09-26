import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

import { WorkoutProvider } from "@/Context/WorkoutContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Track your workouts and build your fitness plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <WorkoutProvider>
          <Navbar />

          {children}

          <Footer />

          <ToastContainer position="top-right" />
        </WorkoutProvider>
      </body>
    </html>
  );
}
