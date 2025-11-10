"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
interface EmptyTaskStateProps {
  onCreateTask: () => void;
}

export function EmptyTaskState({ onCreateTask }: EmptyTaskStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="flex flex-col items-center justify-center">
        {/* Ghost Mascot */}
        <Image
          className="mb-6"
          src="/ghost-sad.png"
          alt="Ghost"
          width={100}
          height={100}
        />

        <h2 className="text-2xl text-center font-bold mb-2">
          No Tasks... Just an Eerie Silence!
        </h2>
        <div className="flex flex-col items-center justify-center max-w-lg gap-y-2 mb-6">
          <p className="text-muted-foreground text-sm text-center">
            It's so empty here... almost too empty. Did your tasks vanish into
            the void?
          </p>
          <p className="text-muted-foreground text-sm max-w-sm text-center">
            Summon a new task before the ghosts start whispering...
          </p>
        </div>

        <Button
          onClick={onCreateTask}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Create New Task
        </Button>
      </div>
    </div>
  );
}
