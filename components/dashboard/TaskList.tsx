"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Task, Status } from "@/types";
import { EmptyTaskState } from "./EmptyTaskState";
import { EmptyStatusState } from "./EmptyStatusState";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
interface TaskListProps {
  tasks: Task[];
  statuses: Status[];
  searchQuery: string;
  filterStatus: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (status: string) => void;
  onToggleFavorite: (taskId: string) => void;
  onCreateTask: () => void;
  onCreateStatus: () => void;
  onDeleteStatus: (status: Status) => void;
}

export function TaskList({
  tasks,
  statuses,
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onToggleFavorite,
  onCreateTask,
  onCreateStatus,
  onDeleteStatus,
}: TaskListProps) {
  if (statuses.length === 0) {
    return <EmptyStatusState onCreateStatus={onCreateStatus} />;
  }

  if (tasks.length === 0) {
    return <EmptyTaskState onCreateTask={onCreateTask} />;
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold mb-1">My Tasks</h1>

        <Button onClick={onCreateTask} className="font-bold">
          Create New Task
        </Button>
      </div>
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        <Select
          value={filterStatus}
          onValueChange={(value) => onFilterChange(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.title}>
                {status.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground w-12"></th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden lg:table-cell">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground w-12"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                  index === tasks.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleFavorite(task.id)}
                    className="text-lg hover:scale-110 transition-transform"
                  >
                    {task.favorite ? "⭐" : "☆"}
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-sm hidden lg:table-cell truncate">
                  {task.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-foreground"
                    style={{
                      backgroundColor: statuses.find(
                        (s) => s.id === task.statusId
                      )?.color,
                    }}
                  >
                    {statuses.find((s) => s.id === task.statusId)?.title}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-muted-foreground hover:text-foreground">
                    ⋯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <button className="hover:text-foreground">← Previous</button>
        <span>1-{tasks.length} of 120</span>
        <button className="hover:text-foreground">Next →</button>
      </div>
    </div>
  );
}
