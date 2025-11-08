"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"

interface User {
  name: string
  email: string
  avatar: string
}

export function DashboardHeader({ user }: { user: User }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("tasks")
    localStorage.removeItem("statuses")
    router.push("/auth/signin")
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="text-red-600 font-black text-xl">TOPO</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language & Theme Toggles - Placeholder */}
          <button className="text-muted-foreground hover:text-foreground">
            <span className="text-lg">A</span>
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <span className="text-lg">🌙</span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
