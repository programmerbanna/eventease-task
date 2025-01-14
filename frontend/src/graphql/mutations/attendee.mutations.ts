import { gql } from '@apollo/client';

export const REGISTER_ATTENDEE = gql`
  mutation RegisterAttendee($eventId: String!) {
    registerAttendee(registerAttendeeInput: { eventId: $eventId }) {
      id
      title
      attendees {
        id
        name
      }
    }
  }
`;

export const UNREGISTER_ATTENDEE = gql`
  mutation UnregisterAttendee($eventId: String!) {
    unregisterAttendee(eventId: $eventId) {
      id
      title
      attendees {
        id
        name
      }
    }
  }
`;