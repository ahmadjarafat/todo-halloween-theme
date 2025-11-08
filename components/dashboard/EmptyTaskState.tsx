"use client"

import { Button } from "@/components/ui/Button"

interface EmptyTaskStateProps {
  onCreateTask: () => void
}

export function EmptyTaskState({ onCreateTask }: EmptyTaskStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        {/* Ghost Mascot */}
        <div className="mb-6 flex justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-red-600" fill="currentColor">
            <path d="M50 10C28 10 10 28 10 50V70C10 85 20 95 50 95C80 95 90 85 90 70V50C90 28 72 10 50 10Z" />
            <circle cx="35" cy="45" r="6" fill="white" />
            <circle cx="35" cy="45" r="3" fill="black" />
            <circle cx="65" cy="45" r="6" fill="white" />
            <circle cx="65" cy="45" r="3" fill="black" />
            <path d="M50 60 L45 70 L55 70 Z" fill="white" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">No Tasks... Just an Eerie Silence!</h2>
        <p className="text-muted-foreground mb-4 max-w-sm">
          It's so empty here... almost too empty. Did your tasks vanish into the void?
        </p>
        <p className="text-muted-foreground mb-6 max-w-sm">Summon a new task before the ghosts start whispering...</p>

        <Button onClick={onCreateTask} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
          Create New Task
        </Button>
      </div>
    </div>
  )
}
