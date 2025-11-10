export interface Task {
  id: string;
  title: string;
  description: string;
  statusId: string; // Reference to Status.id instead of status name
  favorite: boolean;
  userId: string; // Associate task with user
}

export const StatusColor = {
  "#e11d48": "#e11d48", // Pink
  "#818cf8": "#818cf8", // Indigo
  "#93c5fd": "#93c5fd", // Light Blue
  "#1e3a8a": "#1e3a8a", // Navy Blue
  "#4d7c0f": "#4d7c0f", // Green
  "#8b5cf6": "#8b5cf6", // Purple
  "#a78b7e": "#a78b7e", // Taupe
  "#3b82f6": "#3b82f6", // Bright Blue
};

export type StatusColor = keyof typeof StatusColor;
export interface Status {
  id: string;
  title: string;
  color: keyof typeof StatusColor;
  userId: string; // Associate status with user
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  tasks: Task[];
  statuses: Status[];
}
