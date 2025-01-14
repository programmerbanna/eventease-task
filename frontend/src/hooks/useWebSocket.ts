'use client';

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useNotificationContext } from "@/providers/NotificationProvider";
import { useApolloClient } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries/event.queries";

let socket: Socket | null = null;

export function useWebSocket() {
  const { addNotification } = useNotificationContext();
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (!socket) {
      socket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
        {
          withCredentials: true,
          transports: ["websocket"],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        }
      );
    }

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.on("newAttendee", async (data) => {
      console.log("Received newAttendee event:", data);
      addNotification({
        type: "info",
        message: `${data.attendeeName} has registered for ${data.eventTitle}`,
      });
      await apolloClient.refetchQueries({
        include: ["GetEvents"],
      });
    });

    socket.on("eventFull", async (data) => {
      addNotification({
        type: "warning",
        message: `Event "${data.eventTitle}" has reached maximum capacity`,
      });
      // Refetch events to update the UI for all clients
      await apolloClient.refetchQueries({
        include: ["GetEvents"],
      });
    });

    socket.on("eventUpdated", (data) => {
      addNotification({
        type: "info",
        message: `Event "${data.eventTitle}" has been updated`,
      });
    });

    socket.on("attendeeUnregistered", async (data) => {
      console.log("Received attendeeUnregistered event:", data);
      addNotification({
        type: "info",
        message: `${data.attendeeName} has unregistered from ${data.eventTitle}`,
      });
      await apolloClient.refetchQueries({
        include: ["GetEvents"],
      });
    });

    return () => {
      if (socket) {
        socket.off("newAttendee");
        socket.off("eventFull");
        socket.off("eventUpdated");
        socket.off("attendeeUnregistered");
      }
    };
  }, [addNotification, apolloClient]);

  return socket;
}
