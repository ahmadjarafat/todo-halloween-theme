import { Status, User } from "@/types";

// Status utility functions
export const addStatus = (
  userId: string,
  status: Omit<Status, "id" | "userId">
): Status => {
  const newStatus: Status = {
    id: `status_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    userId,
    ...status,
  };

  // Get users from localStorage
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].statuses.push(newStatus);
    localStorage.setItem("users", JSON.stringify(users));

    // Update current user if it's the same user
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedCurrentUser = JSON.parse(currentUser);
      if (parsedCurrentUser.id === userId) {
        parsedCurrentUser.statuses.push(newStatus);
        localStorage.setItem("currentUser", JSON.stringify(parsedCurrentUser));
      }
    }
  }

  return newStatus;
};

export const editStatus = (
  userId: string,
  statusId: string,
  updates: Partial<Omit<Status, "id" | "userId">>
) => {
  // Get users from localStorage
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const statusIndex = users[userIndex].statuses.findIndex(
      (status) => status.id === statusId
    );
    if (statusIndex !== -1) {
      users[userIndex].statuses[statusIndex] = {
        ...users[userIndex].statuses[statusIndex],
        ...updates,
      };
      localStorage.setItem("users", JSON.stringify(users));

      // Update current user if it's the same user
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser);
        if (parsedCurrentUser.id === userId) {
          const currentStatusIndex = parsedCurrentUser.statuses.findIndex(
            (status: Status) => status.id === statusId
          );
          if (currentStatusIndex !== -1) {
            parsedCurrentUser.statuses[currentStatusIndex] = {
              ...parsedCurrentUser.statuses[currentStatusIndex],
              ...updates,
            };
            localStorage.setItem(
              "currentUser",
              JSON.stringify(parsedCurrentUser)
            );
          }
        }
      }

      return users[userIndex].statuses[statusIndex];
    }
  }
  return null;
};

export const deleteStatus = (userId: string, statusId: string) => {
  // Get users from localStorage
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].statuses = users[userIndex].statuses.filter(
      (status) => status.id !== statusId
    );
    localStorage.setItem("users", JSON.stringify(users));

    // Update current user if it's the same user
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedCurrentUser = JSON.parse(currentUser);
      if (parsedCurrentUser.id === userId) {
        parsedCurrentUser.statuses = parsedCurrentUser.statuses.filter(
          (status: Status) => status.id !== statusId
        );
        localStorage.setItem("currentUser", JSON.stringify(parsedCurrentUser));
      }
    }

    return true;
  }
  return false;
};

export const getUserStatuses = (userId: string): Status[] => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.id === userId) {
      return parsedUser.statuses || [];
    }
  }

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((user) => user.id === userId);
  return user?.statuses || [];
};

export const getDefaultStatuses = (userId: string): Status[] => {
  return [
    { id: "status_1", title: "To Do", color: "#ec4899", userId },
    { id: "status_2", title: "In Progress", color: "#6366f1", userId },
    { id: "status_3", title: "Done", color: "#22c55e", userId },
  ];
};
