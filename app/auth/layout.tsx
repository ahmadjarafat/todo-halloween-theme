"use client";

import type React from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import Logo from "@/app/assets/icons/logo.svg";
import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Branding */}
      <div className="hidden w-[36%] lg:flex bg-primary flex-col items-center py-12 px-8 relative overflow-hidden">
        <div className="flex items-center font-rubik mt-12 gap-x-2.5">
          <Logo className="h-21 w-auto text-white" />
          <div className="text-[4rem] text-white">TODO</div>
        </div>

        <div className="flex w-full gap-x-4 mt-44">
          <Image
            src="/ghost-upside-down.png"
            alt="Upside down ghost mascot"
            width={140}
            height={140}
            className="opacity-90"
          />
          <div
            className={cn(
              "text-white flex flex-col bg-primary-400 h-fit py-2 px-3.5 rounded-lg",
              "items-center self-end xl:text-lg text-sm font-rubik",
              "-mb-16 -ml-14"
            )}
          >
            <span>The Haunted ToDo List</span>
            <span>Tasks That Won't Stay Buried!</span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 mt-72 self-start ml-4">
          <Image
            src="/ghost.png"
            alt="Friendly waving ghost mascot"
            width={160}
            height={140}
            className="mt-1 opacity-90"
          />
          <div className="flex flex-col gap-y-1">
            <span className="text-primary-foreground text-md font-bold whitespace-nowrap">
              Iztech Vally
            </span>
            <span className="text-primary-foreground text-sm whitespace-nowrap opacity-70">
              Iztech Vally
            </span>
          </div>
        </div>
      </div>

      {/* Right Content Area */}

      <div className="flex bg-background flex-col lg:w-[64%] w-full">
        <Header />
        <div className="flex items-center justify-center p-6 lg:p-12 h-full">
          {children}
        </div>
        <div className="flex font-bold font-rubik text-primary justify-center lg:justify-end items-center px-6 py-9">
          <p className="text-[22px] lg:text-[13px]">@ IZTECH VALLEY</p>
        </div>
      </div>
    </div>
  );
}
