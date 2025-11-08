"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import type { Task } from "@/app/dashboard/page"

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Omit<Task, "id" | "favorite">) => void
  statuses: string[]
}

export function CreateTaskModal({ isOpen, onClose, onSubmit, statuses }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: statuses[0] || "To Do",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({
        title: "",
        description: "",
        status: statuses[0] || "To Do",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Create Task</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Task title</label>
            <Input
              type="text"
              name="title"
              placeholder="Kill the Boss"
              value={formData.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Type somthing ..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11">
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}
