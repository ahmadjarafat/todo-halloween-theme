"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Status } from "@/types";
import { StatusColor } from "@/types";
import { ModalWrapper } from "@/components/ui/ModalWrapper";
interface CreateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: Omit<Status, "id" | "userId">) => void;
}

export function CreateStatusModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateStatusModalProps) {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<StatusColor>("#e11d48");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title,
        color: selectedColor,
      });
      setTitle("");
      setSelectedColor("#e11d48");
    }
  };

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={onClose}
      title="Create Status"
      mobileSide="bottom"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Status title"
          labelClassName="font-medium"
          type="text"
          required
          placeholder="Done"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Select Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {Object.values(StatusColor).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color as StatusColor)}
                className={`sm:w-10 sm:h-10 w-8 h-8 rounded-lg transition-transform ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full font-bold mt-6">
          Create
        </Button>
      </form>
    </ModalWrapper>
  );
}
