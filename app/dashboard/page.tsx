"use client";

import { useState, useEffect } from "react";
import { TaskList } from "@/components/dashboard/TaskList";
import { CreateTaskModal } from "@/components/dashboard/modals/CreateTaskModal";
import { CreateStatusModal } from "@/components/dashboard/modals/CreateStatusModal";
import { DeleteStatusModal } from "@/components/dashboard/modals/DeleteStatusModal";
import { useAuth } from "@/contexts/AuthContext";
import { Task, Status } from "@/types";
import { addTask, editTask, deleteTask, getUserTasks } from "@/utils/taskUtils";
import { addStatus, deleteStatus, getUserStatuses } from "@/utils/statusUtils";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateStatus, setShowCreateStatus] = useState(false);
  const [showDeleteStatus, setShowDeleteStatus] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState<Status | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load user-specific tasks and statuses
      const userTasks = getUserTasks(user.id);
      const userStatuses = getUserStatuses(user.id);
      
      setTasks(userTasks);
      setStatuses(userStatuses);
    }
  }, [user]);

  useEffect(() => {
    // Demo tasks for new users
    if (user && tasks.length === 0 && statuses.length > 0) {
      const demoTasksData = [
        { title: "Design landing page", description: "Create a modern and responsive landing page design", statusId: statuses[1]?.id || statuses[0]?.id },
        { title: "Setup authentication", description: "Implement user login and registration functionality", statusId: statuses[0]?.id },
        { title: "Create API endpoints", description: "Build REST API for data management", statusId: statuses[1]?.id || statuses[0]?.id },
        { title: "Write documentation", description: "Document the API and user interface", statusId: statuses[2]?.id || statuses[0]?.id },
      ];
      
      demoTasksData.forEach((taskData, i) => {
        if (taskData.statusId) {
          const newTask = addTask(user.id, { ...taskData, favorite: i === 0 });
          setTasks(prev => [...prev, newTask]);
        }
      });
    }
  }, [user, statuses]);

  const handleAddTask = (task: Omit<Task, "id" | "favorite" | "userId">) => {
    if (!user) return;
    
    const newTask = addTask(user.id, { ...task, favorite: false });
    setTasks(prev => [...prev, newTask]);
    setShowCreateTask(false);
  };

  const handleToggleFavorite = (taskId: string) => {
    if (!user) return;
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = editTask(user.id, taskId, { favorite: !task.favorite });
      if (updatedTask) {
        setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      }
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (!user) return;
    
    const success = deleteTask(user.id, taskId);
    if (success) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleAddStatus = (status: Omit<Status, "id" | "userId">) => {
    if (!user) return;
    
    const newStatus = addStatus(user.id, status);
    setStatuses(prev => [...prev, newStatus]);
    setShowCreateStatus(false);
  };

  const handleDeleteStatus = (status: Status) => {
    setStatusToDelete(status);
    setShowDeleteStatus(true);
  };

  const confirmDeleteStatus = () => {
    if (!user || !statusToDelete) return;
    
    const success = deleteStatus(user.id, statusToDelete.id);
    if (success) {
      setStatuses(prev => prev.filter(s => s.id !== statusToDelete.id));
      setShowDeleteStatus(false);
      setStatusToDelete(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    // Find the status object for this task
    const taskStatus = statuses.find(status => status.id === task.statusId);
    const matchesStatus =
      filterStatus === "all" || taskStatus?.title === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
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
        statuses={statuses}
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
  );
}
