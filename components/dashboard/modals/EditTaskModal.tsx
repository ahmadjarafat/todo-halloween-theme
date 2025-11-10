"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Task, Status } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ModalWrapper } from "@/components/ui/ModalWrapper";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "userId">) => void;
  statuses: Status[];
  task: Task | null;
}

export function EditTaskModal({
  isOpen,
  onClose,
  onSubmit,
  statuses,
  task,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    statusId: "",
    favorite: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        statusId: task.statusId,
        favorite: task.favorite,
      });
    }
  }, [task, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={onClose}
      title="Edit Task"
      mobileSide="bottom"
      className="max-w-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-5">
        <Input
          label="Task title"
          labelClassName="font-medium"
          type="text"
          name="title"
          required
          placeholder="Kill the Boss"
          value={formData.title}
          onChange={handleChange}
          className="w-full"
        />

        <div className="flex flex-col gap-y-1">
          <label className="block text-sm font-medium">Description</label>
          <Textarea
            name="description"
            required
            placeholder="Type something ..."
            value={formData.description}
            onChange={handleChange}
            className="w-full"
            rows={8}
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="block text-sm font-medium">Status</label>

          <Select
            value={formData.statusId}
            onValueChange={(value) =>
              setFormData({ ...formData, statusId: value })
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full font-bold mt-6">
          Update
        </Button>
      </form>
    </ModalWrapper>
  );
}
