// store/notifications.ts
import { create } from "zustand";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface NotificationStore {
  notifications: Notification[];
  add: (message: string, type?: Notification["type"]) => void;
  remove: (id: number) => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  add: (message, type = "info") =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now() + Math.random(), message, type },
      ],
    })),
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
