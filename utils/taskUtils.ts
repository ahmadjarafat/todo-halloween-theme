import { Task, User } from "@/types";

// Task utility functions
export const addTask = (
  userId: string,
  task: Omit<Task, "id" | "userId">
): Task => {
  const newTask: Task = {
    id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    userId,
    ...task,
  };

  // Get users from localStorage
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].tasks.push(newTask);
    localStorage.setItem("users", JSON.stringify(users));

    // Update current user if it's the same user
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedCurrentUser = JSON.parse(currentUser);
      if (parsedCurrentUser.id === userId) {
        parsedCurrentUser.tasks.push(newTask);
        localStorage.setItem("currentUser", JSON.stringify(parsedCurrentUser));
      }
    }
  }

  return newTask;
};

export const editTask = (
  userId: string,
  taskId: string,
  updates: Partial<Omit<Task, "id" | "userId">>
) => {
  // Get users from localStorage
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const taskIndex = users[userIndex].tasks.findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex !== -1) {
      users[userIndex].tasks[taskIndex] = {
        ...users[userIndex].tasks[taskIndex],
        ...updates,
      };
      localStorage.setItem("users", JSON.stringify(users));

      // Update current user if it's the same user
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser);
        if (parsedCurrentUser.id === userId) {
          const currentTaskIndex = parsedCurrentUser.tasks.findIndex(
            (task: Task) => task.id === taskId
          );
          if (currentTaskIndex !== -1) {
            parsedCurrentUser.tasks[currentTaskIndex] = {
              ...parsedCurrentUser.tasks[currentTaskIndex],
              ...updates,
            };
            localStorage.setItem(
              "currentUser",
              JSON.stringify(parsedCurrentUser)
            );
          }
        }
      }

      return users[userIndex].tasks[taskIndex];
    }
  }
  return null;
};

export const deleteTask = (userId: string, taskId: string) => {
  // Get users from localStorage
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].tasks = users[userIndex].tasks.filter(
      (task) => task.id !== taskId
    );
    localStorage.setItem("users", JSON.stringify(users));

    // Update current user if it's the same user
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedCurrentUser = JSON.parse(currentUser);
      if (parsedCurrentUser.id === userId) {
        parsedCurrentUser.tasks = parsedCurrentUser.tasks.filter(
          (task: Task) => task.id !== taskId
        );
        localStorage.setItem("currentUser", JSON.stringify(parsedCurrentUser));
      }
    }

    return true;
  }
  return false;
};

export const getUserTasks = (userId: string): Task[] => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.id === userId) {
      return parsedUser.tasks || [];
    }
  }

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((user) => user.id === userId);
  return user?.tasks || [];
};

export const getDefaultTasks = (userId: string): Task[] => {
  return [
    {
      id: `task_${userId}_1`,
      title: "Design landing page",
      description: "Create a modern and responsive landing page design",
      statusId: "status_1",
      userId,
      favorite: false,
    },
    {
      id: `task_${userId}_2`,
      title: "Setup authentication",
      description: "Implement user login and registration functionality",
      statusId: "status_2",
      userId,
      favorite: false,
    },
    {
      id: `task_${userId}_3`,
      title: "Create API endpoints",
      description: "Build REST API for data management",
      statusId: "status_3",
      userId,
      favorite: false,
    },
    {
      id: `task_${userId}_4`,
      title: "Write documentation",
      description: "Document the API and user interface",
      statusId: "status_4",
      userId,
      favorite: false,
    },
  ];
};
