import * as Yup from "yup";

export const createEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  date: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Date is required"),
  location: Yup.string()
    .required("Location is required"),
  maxAttendees: Yup.number()
    .min(1, "Must allow at least 1 attendee")
    .required("Maximum attendees is required"),
});
