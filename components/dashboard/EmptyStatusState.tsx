"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
interface EmptyStatusStateProps {
  onCreateStatus: () => void;
}

export function EmptyStatusState({ onCreateStatus }: EmptyStatusStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Ghost Mascot */}
        <Image src="/ghost-boo.png" alt="Ghost" width={100} height={100} />

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Uh-oh... It's Empty in Here!
        </h2>
        <p className="text-muted-foreground mb-4 max-w-sm">
          Looks like all your statuses have vanished into the abyss!
        </p>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Create a new one before the ghosts take over...
        </p>

        <Button
          onClick={onCreateStatus}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Create New Status
        </Button>
      </div>
    </div>
  );
}
