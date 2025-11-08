"use client";

import type React from "react";
import Image from "next/image";
import { Header } from "@/components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Branding */}
      <div className="hidden w-[36%] lg:flex bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-white mb-8">
            <div className="text-6xl font-black tracking-tighter mb-4">
              TOPO
            </div>
            <p className="text-red-100 font-bold text-lg">
              The Haunted ToDo List
            </p>
            <p className="text-red-100 font-bold text-lg">
              Tasks That Won't Stay Buried!
            </p>
          </div>

          <div className="flex gap-6 mt-12">
            <div className="flex-1">
              <Image
                src="/ghost-surprised.png"
                alt="Surprised ghost mascot"
                width={120}
                height={140}
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <Image
                src="/ghost-waving.png"
                alt="Friendly waving ghost mascot"
                width={120}
                height={140}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white">
          <div className="text-sm font-semibold">IZTECH VALLEY</div>
        </div>
      </div>

      {/* Right Content Area */}

      <div className="flex flex-col w-[64%]">
        <Header />
        <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
