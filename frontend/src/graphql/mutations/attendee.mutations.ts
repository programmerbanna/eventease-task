import { gql } from "@apollo/client";

export const REGISTER_ATTENDEE = gql`
  mutation RegisterAttendee($registerAttendeeInput: RegisterAttendeeInput!) {
    registerAttendee(registerAttendeeInput: $registerAttendeeInput) {
      id
      title
      description
      date
      location
      maxAttendees
      attendees {
        id
        name
        email
      }
      creator {
        id
        name
        email
      }
    }
  }
`;

export const UNREGISTER_ATTENDEE = gql`
  mutation UnregisterAttendee($eventId: String!) {
    unregisterAttendee(eventId: $eventId) {
      id
      title
      description
      date
      location
      maxAttendees
      creatorId
      attendees {
        id
        name
      }
    }
  }
`;
