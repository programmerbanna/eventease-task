import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useNotifications } from "./useNotifications";

let socket: Socket | null = null;

export function useWebSocket() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
        withCredentials: true,
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.on("newAttendee", (data) => {
      addNotification({
        type: "info",
        message: `${data.attendeeName} has registered for ${data.eventTitle}`,
      });
    });

    socket.on("eventFull", (data) => {
      addNotification({
        type: "warning",
        message: `Event "${data.eventTitle}" has reached maximum capacity`,
      });
    });

    socket.on("eventUpdated", (data) => {
      addNotification({
        type: "info",
        message: `Event "${data.eventTitle}" has been updated`,
      });
    });

    return () => {
      if (socket) {
        socket.off("newAttendee");
        socket.off("eventFull");
        socket.off("eventUpdated");
      }
    };
  }, [addNotification]);

  return socket;
}
