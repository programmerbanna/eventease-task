import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents {
    findAllEvents {
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