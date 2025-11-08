"use client"

import { Button } from "@/components/ui/Button"

interface EmptyStatusStateProps {
  onCreateStatus: () => void
}

export function EmptyStatusState({ onCreateStatus }: EmptyStatusStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Ghost Mascot */}
        <div className="mb-6 flex justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-red-600" fill="currentColor">
            <path d="M50 20C30 20 15 35 15 55V75C15 88 23 95 50 95C77 95 85 88 85 75V55C85 35 70 20 50 20Z" />
            <circle cx="32" cy="50" r="7" fill="white" />
            <circle cx="32" cy="50" r="4" fill="black" />
            <circle cx="68" cy="50" r="7" fill="white" />
            <circle cx="68" cy="50" r="4" fill="black" />
            <path d="M50 65 C45 70 40 75 50 75 C60 75 55 70 50 65 Z" fill="white" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Uh-oh... It's Empty in Here!</h2>
        <p className="text-muted-foreground mb-4 max-w-sm">
          Looks like all your statuses have vanished into the abyss!
        </p>
        <p className="text-muted-foreground mb-6 max-w-sm">Create a new one before the ghosts take over...</p>

        <Button onClick={onCreateStatus} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
          Create New Status
        </Button>
      </div>
    </div>
  )
}
