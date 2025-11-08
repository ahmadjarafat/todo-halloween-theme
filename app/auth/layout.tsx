"use client"

import type React from "react"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Sidebar - Branding */}
      <div className="hidden lg:flex bg-red-600 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-40 bg-red-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="text-white mb-8">
            <div className="text-6xl font-black tracking-tighter mb-4">TOPO</div>
            <p className="text-red-100 font-bold text-lg">The Haunted ToDo List</p>
            <p className="text-red-100 font-bold text-lg">Tasks That Won't Stay Buried!</p>
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
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white">{children}</div>
    </div>
  )
}
