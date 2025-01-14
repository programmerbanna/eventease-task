'use client';

import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Notification {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

const NOTIFICATION_TIMEOUT = 5000; // 5 seconds

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = uuidv4();
      setNotifications((prev) => [...prev, { ...notification, id }]);

      // Auto-dismiss after timeout
      setTimeout(() => {
        removeNotification(id);
      }, NOTIFICATION_TIMEOUT);
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
