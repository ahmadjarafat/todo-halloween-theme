export interface Task {
  id: string;
  title: string;
  description: string;
  statusId: string; // Reference to Status.id instead of status name
  favorite: boolean;
  userId: string; // Associate task with user
}

export interface Status {
  id: string;
  title: string;
  color: string;
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