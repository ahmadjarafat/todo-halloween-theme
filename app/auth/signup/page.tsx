"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { AvatarImage } from "@/components/ui/Avatar";
import { AvatarFallback } from "@/components/ui/Avatar";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignUp() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError("Image must be less than 2MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          avatar: base64String,
        }));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Use the signup function from AuthContext
    const result = signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: formData.avatar || "/avatar.png",
      tasks: [],
      statuses: [],
    });

    if (!result.success) {
      setError(result.message || "Signup failed");
    }
  };

  return (
    <div className="w-full max-w-[20rem] md:max-w-[40rem] lg:max-w-[22.5rem]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Create an account
        </h1>
        <p className="text-[var(--muted-text)] mb-4 text-sm">
          Let's get started. Fill in the details below to create your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={cn(
            "flex flex-col items-center py-0",
            "sm:flex-row sm:gap-x-4 sm:py-4"
          )}
        >
          <Avatar className="size-20 sm:size-10">
            <AvatarImage
              className="rounded-full"
              src={formData.avatar || "/avatar.png"}
              alt="Avatar"
            />
            <AvatarFallback>{formData.name.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="font-bold !px-4 !py-4 mt-6 sm:mt-0 w-full sm:w-auto"
            onClick={handleUploadClick}
          >
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Minimum 8 characters.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full font-bold mt-2">
          Sign up
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
