import { User } from "./auth.types";

export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  location: string;
  maxAttendees: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxAttendees: number;
  creatorId: string;
  creator: User;
  attendees: User[];
  createdAt: string;
  updatedAt: string;
}
