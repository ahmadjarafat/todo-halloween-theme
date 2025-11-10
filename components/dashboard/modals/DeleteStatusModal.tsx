"use client"

import { Button } from "@/components/ui/Button"
import type { Status } from "@/types"
import { ModalWrapper } from "@/components/ui/ModalWrapper"

interface DeleteStatusModalProps {
  isOpen: boolean
  status: Status | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteStatusModal({ isOpen, status, onClose, onConfirm }: DeleteStatusModalProps) {
  if (!status) return null

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={onClose}
      title="Delete Status"
      mobileSide="bottom"
      className="max-w-sm"
    >
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
    </ModalWrapper>
  )
}
