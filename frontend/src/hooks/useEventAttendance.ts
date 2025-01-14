import { useMutation } from "@apollo/client";
import {
  REGISTER_ATTENDEE,
  UNREGISTER_ATTENDEE,
} from "@/graphql/mutations/attendee.mutations";
import { useNotifications } from "./useNotifications";

export function useEventAttendance() {
  const { addNotification } = useNotifications();

  const [registerMutation] = useMutation(REGISTER_ATTENDEE, {
    refetchQueries: ["GetEvents"],
    awaitRefetchQueries: true,
  });
  const [unregisterMutation] = useMutation(UNREGISTER_ATTENDEE, {
    refetchQueries: ["GetEvents"],
    awaitRefetchQueries: true,
  });

  const registerForEvent = async (eventId: string) => {
    try {
      const response = await registerMutation({
        variables: {
          registerAttendeeInput: { eventId },
        },
      });
      addNotification({
        type: "success",
        message: "Successfully registered for event",
      });
      return response.data?.registerAttendee;
    } catch (error) {
      console.error("Error registering for event:", error);
      addNotification({
        type: "error",
        message: "Failed to register for event",
      });
      throw error;
    }
  };

  const unregisterFromEvent = async (eventId: string) => {
    try {
      const response = await unregisterMutation({
        variables: { eventId },
      });
      addNotification({
        type: "success",
        message: "Successfully unregistered from event",
      });
      return response.data?.unregisterAttendee;
    } catch (error) {
      console.error("Error unregistering from event:", error);
      addNotification({
        type: "error",
        message: "Failed to unregister from event",
      });
      throw error;
    }
  };

  return { registerForEvent, unregisterFromEvent };
}
