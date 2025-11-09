"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import MoonIcon from "@/app/assets/icons/moon.svg";
import LanguageIcon from "@/app/assets/icons/language.svg";
import Logo from "@/app/assets/icons/logo.svg";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();

  console.log(theme);
  return (
    <header className="bg-background w-full" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center font-rubik mt-1.5 ml-2">
          <Logo className="h-10 w-auto text-primary -mr-1" />
          <div className="text-2xl text-primary mb-2">TODO</div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" className="p-2 hover:bg-primary/10 mb-0.5">
            <LanguageIcon
              className={cn(
                theme === "dark"
                  ? "text-[#474747] stroke-white"
                  : "text-transparent stroke-[#28292e]"
              )}
            />
          </Button>

          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            className="p-2 hover:bg-primary/10"
          >
            <MoonIcon
              className={cn(
                theme === "dark"
                  ? "text-primary stroke-primary"
                  : "text-transparent stroke-[#28292e] stroke-2"
              )}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
