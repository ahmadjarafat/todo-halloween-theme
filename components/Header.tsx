"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import MoonIcon from "@/app/assets/icons/moon.svg";
import LanguageIcon from "@/app/assets/icons/language.svg";
import Logo from "@/app/assets/icons/logo-primary.svg";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="bg-background w-full" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Image
          src={Logo}
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-primary/10"
          >
            <Image
              src={MoonIcon}
              alt="Toggle theme"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
            <Image
              src={LanguageIcon}
              alt="Language"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
