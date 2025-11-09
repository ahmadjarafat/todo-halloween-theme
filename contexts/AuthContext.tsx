"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/types";
import { getDefaultTasks } from "@/utils/taskUtils";
import { getDefaultStatuses } from "@/utils/statusUtils";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (userData: Omit<User, "id">) => {
    success: boolean;
    message?: string;
  };
  login: (
    email: string,
    password: string
  ) => { success: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage for existing logged in user
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse current user from localStorage");
        localStorage.removeItem("currentUser");
        // Remove cookie as well
        document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    }
    setLoading(false);
  }, []); // Run only once on mount

  const signup = (userData: Omit<User, "id">) => {
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    const emailExists = existingUsers.some(
      (user: User) => user.email === userData.email
    );
    if (emailExists) {
      return { success: false, message: "Email already registered" };
    }

    // Generate unique ID for new user
    const userId = `user_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 11)}`;

    const newUser: User = {
      id: userId,
      ...userData,
      tasks: getDefaultTasks(userId),
      statuses: getDefaultStatuses(userId),
    };

    // Add new user to users array
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Log the user in immediately
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    // Set cookie for middleware
    document.cookie = `currentUser=${JSON.stringify(newUser)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
    setUser(newUser);
    router.push("/dashboard");

    return { success: true };
  };

  const login = (email: string, password: string) => {
    // Get all users
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user with matching email and password
    const matchedUser = users.find(
      (user: User) => user.email === email && user.password === password
    );

    if (matchedUser) {
      // Login successful
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      // Set cookie for middleware
      document.cookie = `currentUser=${JSON.stringify(matchedUser)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      setUser(matchedUser);
      router.push("/dashboard");
      return { success: true };
    } else {
      // Login failed
      return { success: false, message: "Invalid email or password" };
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    // Remove cookie
    document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
