"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    // Store in localStorage for demo
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      }),
    )

    router.push("/dashboard")
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Create an account</h1>
        <p className="text-muted-foreground">Let's get started. Fill in the details below to create your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
        )}

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11">
          Sign up
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-red-600 hover:text-red-700 font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
