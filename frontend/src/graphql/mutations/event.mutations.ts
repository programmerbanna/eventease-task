import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
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

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, updateEventInput: $input) {
      id
      title
      description
      date
      location
      maxAttendees
    }
  }
`;
