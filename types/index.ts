export interface Task {
  id: string;
  title: string;
  description: string;
  statusId: string; // Reference to Status.id instead of status name
  favorite: boolean;
  userId: string; // Associate task with user
}

export const StatusColor = {
  "#ec4899": "#ec4899", // Pink
  "#6366f1": "#6366f1", // Indigo
  "#60a5fa": "#60a5fa", // Blue
  "#3b82f6": "#3b82f6", // Blue Dark
  "#22c55e": "#22c55e", // Green
  "#a855f7": "#a855f7", // Purple
  "#d4a574": "#d4a574", // Tan
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
