import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface Notification {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = uuidv4();
      setNotifications((prev) => [...prev, { ...notification, id }]);
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
}
