"use client"

import { Button } from "@/components/ui/Button"
import type { Status } from "@/types"

interface DeleteStatusModalProps {
  isOpen: boolean
  status: Status | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteStatusModal({ isOpen, status, onClose, onConfirm }: DeleteStatusModalProps) {
  if (!isOpen || !status) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Delete Status</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Beware! You're About to Erase the "{status.title} Status"!
          </h3>
          <p className="text-muted-foreground mb-2">All tasks in this status will vanish into the void forever...</p>
          <p className="text-muted-foreground">Once they're gone, there's no bringing them back!</p>
        </div>

        <Button onClick={onConfirm} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11 mb-2">
          Delete the Status
        </Button>
        <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
          Cancel
        </Button>
      </div>
    </div>
  )
}
