"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { TaskList } from "@/components/dashboard/TaskList"
import { CreateTaskModal } from "@/components/dashboard/modals/CreateTaskModal"
import { CreateStatusModal } from "@/components/dashboard/modals/CreateStatusModal"
import { DeleteStatusModal } from "@/components/dashboard/modals/DeleteStatusModal"

export interface Task {
  id: string
  title: string
  description: string
  status: string
  favorite: boolean
}

export interface Status {
  id: string
  title: string
  color: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [statuses, setStatuses] = useState<Status[]>([
    { id: "1", title: "To Do", color: "#e5e7eb" },
    { id: "2", title: "In Progress", color: "#c7d2fe" },
    { id: "3", title: "Done", color: "#d1d5db" },
  ])
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showCreateStatus, setShowCreateStatus] = useState(false)
  const [showDeleteStatus, setShowDeleteStatus] = useState(false)
  const [statusToDelete, setStatusToDelete] = useState<Status | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/auth/signin")
      return
    }
    setUser(JSON.parse(storedUser))

    // Load tasks from localStorage
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      // Demo tasks
      const demoTasks = Array(8)
        .fill(null)
        .map((_, i) => ({
          id: String(i + 1),
          title: "Design landing Page",
          description: "flfasdmfsdmfmsdlvm,xcrmv.mxc.vmxcmlxcmvl",
          status: "In Progress",
          favorite: i === 0,
        }))
      setTasks(demoTasks)
    }
  }, [router])

  const handleAddTask = (task: Omit<Task, "id" | "favorite">) => {
    const newTask: Task = {
      ...task,
      id: String(tasks.length + 1),
      favorite: false,
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setShowCreateTask(false)
  }

  const handleToggleFavorite = (taskId: string) => {
    const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, favorite: !t.favorite } : t))
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleAddStatus = (status: Omit<Status, "id">) => {
    const newStatus: Status = {
      ...status,
      id: String(statuses.length + 1),
    }
    const updatedStatuses = [...statuses, newStatus]
    setStatuses(updatedStatuses)
    localStorage.setItem("statuses", JSON.stringify(updatedStatuses))
    setShowCreateStatus(false)
  }

  const handleDeleteStatus = (status: Status) => {
    setStatusToDelete(status)
    setShowDeleteStatus(true)
  }

  const confirmDeleteStatus = () => {
    if (statusToDelete) {
      const updatedStatuses = statuses.filter((s) => s.id !== statusToDelete.id)
      setStatuses(updatedStatuses)
      localStorage.setItem("statuses", JSON.stringify(updatedStatuses))
      setShowDeleteStatus(false)
      setStatusToDelete(null)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="max-w-full">
        <TaskList
          tasks={filteredTasks}
          statuses={statuses}
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterStatus}
          onToggleFavorite={handleToggleFavorite}
          onCreateTask={() => setShowCreateTask(true)}
          onCreateStatus={() => setShowCreateStatus(true)}
          onDeleteStatus={handleDeleteStatus}
        />
      </main>

      <CreateTaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onSubmit={handleAddTask}
        statuses={statuses.map((s) => s.title)}
      />

      <CreateStatusModal
        isOpen={showCreateStatus}
        onClose={() => setShowCreateStatus(false)}
        onSubmit={handleAddStatus}
      />

      <DeleteStatusModal
        isOpen={showDeleteStatus}
        status={statusToDelete}
        onClose={() => setShowDeleteStatus(false)}
        onConfirm={confirmDeleteStatus}
      />
    </div>
  )
}
