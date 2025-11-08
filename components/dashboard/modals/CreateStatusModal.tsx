"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import type { Status } from "@/app/dashboard/page"

interface CreateStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (status: Omit<Status, "id">) => void
}

const COLORS = [
  "#ec4899", // Pink
  "#6366f1", // Indigo
  "#60a5fa", // Blue
  "#3b82f6", // Blue Dark
  "#22c55e", // Green
  "#a855f7", // Purple
  "#d4a574", // Tan
  "#3b82f6", // Sky Blue
]

export function CreateStatusModal({ isOpen, onClose, onSubmit }: CreateStatusModalProps) {
  const [title, setTitle] = useState("")
  const [selectedColor, setSelectedColor] = useState(COLORS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit({
        title,
        color: selectedColor,
      })
      setTitle("")
      setSelectedColor(COLORS[0])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Create Status</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status title</label>
            <Input
              type="text"
              placeholder="Done"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-4">Select Color</label>
            <div className="flex gap-3 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg transition-transform ${
                    selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11">
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}
