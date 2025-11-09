"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import MoonIcon from "@/app/assets/icons/moon.svg";
import LanguageIcon from "@/app/assets/icons/language.svg";
import Logo from "@/app/assets/icons/logo.svg";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { LogOut } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <header className="bg-background w-full" suppressHydrationWarning>
      <div className="mx-auto px-4 py-6 sm:px-6 sm:py-4 flex items-center justify-between">
        <div className="flex items-center font-rubik gap-x-1">
          <Logo className="h-8 w-auto text-primary" />
          <div className="text-2xl text-primary">TODO</div>
        </div>

        <div className="flex items-center gap-x-5">
          <Button variant="ghost" className="!p-1 hover:bg-primary/10 mb-0.5">
            <LanguageIcon
              className={cn(
                "h-[32px] w-auto",
                theme === "dark"
                  ? "text-[#474747] stroke-white"
                  : "text-transparent stroke-[#28292e]"
              )}
            />
          </Button>

          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            className="!p-1 hover:bg-primary/10"
          >
            <MoonIcon
              className={cn(
                "h-[34px] w-auto",
                theme === "dark"
                  ? "text-primary stroke-primary"
                  : "text-transparent stroke-[#28292e] stroke-2"
              )}
            />
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
