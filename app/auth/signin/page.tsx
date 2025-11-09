"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";

export default function SignIn() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    // Use the login function from AuthContext
    const result = login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-[20rem] md:max-w-[32rem] lg:max-w-[22.5rem]">
      <div className="text-center mb-10 md:mb-14 lg:mb-6">
        <h1 className="text-[2rem] font-bold text-foreground mb-6 lg:mb-3">
          Sign in
        </h1>
        <div className="flex flex-col gap-y-2 text-[var(--muted-text)]">
          <p>Log in to unlock tailored content and stay</p>
          <p>connected with your community.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="lg:space-y-4 space-y-10">
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
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button
          disabled={!formData.email || !formData.password}
          type="submit"
          className="w-full font-semibold mt-0 md:mt-6 lg:mt-2"
        >
          Sign in
        </Button>

        <p className="text-center text-sm text-[var(--muted-text)] mt-0 md:mt-0 lg:mt-2 font-bold">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-red-600 hover:text-red-700 font-normal underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
