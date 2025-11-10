"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Task, Status, StatusColor } from "@/types";
import { EmptyTaskState } from "./EmptyTaskState";
import { EmptyStatusState } from "./EmptyStatusState";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/Select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/DropdownMenu";
import {
  MoveRight,
  MoveLeft,
  CirclePlus,
  MoreVertical,
  Edit,
  Trash2,
  ArrowRight,
  MoreHorizontal,
  Search,
  Zap,
} from "lucide-react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onChangeTaskStatus?: (taskId: string, statusId: string) => void;
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
  onEditTask,
  onDeleteTask,
  onChangeTaskStatus,
}: TaskListProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const isMobile = useIsMobile();

  const statusColorToBackgroundColorMap: Record<StatusColor, string> = {
    "#ec4899": "#fce7f3", // light pink (≈5x lighter)
    "#6366f1": "#e0e7ff", // light indigo
    "#60a5fa": "#dbeafe", // light sky blue
    "#3b82f6": "#dbeafe", // light blue
    "#22c55e": "#dcfce7", // light green
    "#a855f7": "#f3e8ff", // light purple
    "#d4a574": "#fef3c7", // light amber
  };

  // Calculate pagination
  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  // Reset to first page when tasks change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [tasks.length]);
  if (statuses.length === 0) {
    return <EmptyStatusState onCreateStatus={onCreateStatus} />;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold mb-1">My Tasks</h1>

        <Button onClick={onCreateTask} className="font-bold">
          Create New Task
        </Button>
      </div>
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-x-2 gap-y-2 mb-12">
        <div className="flex w-full">
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
          <SelectTrigger className="w-full lg:w-[12.5rem]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.title}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-sm"
                    style={{ backgroundColor: status.color }}
                  />
                  <span>{status.title}</span>
                </div>
              </SelectItem>
            ))}

            <SelectItem value="favorite" onClick={onCreateStatus}>
              <div className="flex items-center gap-2">
                <CirclePlus className="w-5 h-5" />
                <span>Create New Status</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Table */}
      {tasks.length === 0 ? (
        <EmptyTaskState onCreateTask={onCreateTask} />
      ) : (
        <div className="rounded-lg overflow-hidden bg-background">
          <table className="w-full table-fixed">
            <thead className="">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold w-8"></th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-1/2">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell w-1/2">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-[120px]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold w-12"></th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
                <tr
                  key={task.id}
                  className={`hover:bg-secondary/50 transition-colors ${
                    index === currentTasks.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="w-8">
                    <div className="text-right mb-2">
                      <button
                        onClick={() => onToggleFavorite(task.id)}
                        className="text-lg hover:scale-110 transition-transform"
                      >
                        <StarIcon
                          className={cn("w-6 h-6 text-primary")}
                          fill={task.favorite ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="flex items-center px-4 py-4 font-medium">
                    {task.title}
                  </td>
                  <td className="flex items-center px-6 py-4 text-sm hidden md:table-cell truncate">
                    {task.description}
                  </td>
                  <td className="px-1 py-4 w-[120px]">
                    {!isMobile ? (
                      <div className="flex items-center justify-end">
                        <span
                          className={cn(
                            "inline-block text-center w-28 px-4 py-2 rounded-md text-sm text-muted-foreground font-bold"
                          )}
                          style={{
                            backgroundColor:
                              statusColorToBackgroundColorMap[
                                statuses.find((s) => s.id === task.statusId)
                                  ?.color as StatusColor
                              ],
                            color: statuses.find((s) => s.id === task.statusId)
                              ?.color,
                          }}
                        >
                          {statuses.find((s) => s.id === task.statusId)?.title}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-start ml-7">
                        <span
                          className={cn(
                            "inline-block text-center w-8 h-8 rounded-sm"
                          )}
                          style={{
                            backgroundColor: statuses.find(
                              (s) => s.id === task.statusId
                            )?.color,
                          }}
                        ></span>
                      </div>
                    )}
                  </td>
                  <td className="px-1 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Zap className="h-4 w-4" />
                          Change to
                        </DropdownMenuItem>
                        {statuses
                          .filter((status) => status.id !== task.statusId)
                          .map((status) => (
                            <DropdownMenuItem
                              key={status.id}
                              className="cursor-pointer"
                              onClick={() =>
                                onChangeTaskStatus?.(task.id, status.id)
                              }
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-sm"
                                  style={{ backgroundColor: status.color }}
                                />
                                <span>{status.title}</span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => onEditTask?.(task)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointe"
                          onClick={() => onDeleteTask?.(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalTasks > tasksPerPage && (
        <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MoveLeft className="w-3 h-3 mr-2" />
            Previous
          </Button>
          <span>
            {startIndex + 1}-{Math.min(endIndex, totalTasks)} of {totalTasks}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <MoveRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
