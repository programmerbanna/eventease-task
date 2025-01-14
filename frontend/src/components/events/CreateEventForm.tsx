import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createEventSchema } from '../../schemas/event.schema';
import type { CreateEventInput } from '@/types/event.types';

interface CreateEventFormProps {
    onSubmit: (values: CreateEventInput) => Promise<void>;
}

export default function CreateEventForm({ onSubmit }: CreateEventFormProps) {
    const initialValues: CreateEventInput = {
        title: '',
        description: '',
        date: '',
        location: '',
        maxAttendees: 1,
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={createEventSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                    await onSubmit(values);
                    resetForm();
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            Event Title
                        </label>
                        <Field
                            type="text"
                            name="title"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <Field
                            as="textarea"
                            name="description"
                            rows={4}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">
                            Date
                        </label>
                        <Field
                            type="datetime-local"
                            name="date"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="date"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-1">
                            Location
                        </label>
                        <Field
                            type="text"
                            name="location"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="maxAttendees" className="block text-sm font-medium mb-1">
                            Maximum Attendees
                        </label>
                        <Field
                            type="number"
                            name="maxAttendees"
                            min="1"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="maxAttendees"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating event...' : 'Create Event'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}