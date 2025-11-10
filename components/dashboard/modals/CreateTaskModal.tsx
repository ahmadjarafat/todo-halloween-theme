"use client";

import type React from "react";

import { useState } from "react";
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

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "favorite" | "userId">) => void;
  statuses: Status[];
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  statuses,
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    statusId: statuses[0]?.id || "",
  });

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
      setFormData({
        title: "",
        description: "",
        statusId: statuses[0]?.id || "",
      });
    }
  };

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={onClose}
      title="Create Task"
      mobileSide="bottom"
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
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
            placeholder="Type somthing ..."
            value={formData.description}
            onChange={handleChange}
            className="w-full"
            rows={6}
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
          Create
        </Button>
      </form>
    </ModalWrapper>
  );
}
