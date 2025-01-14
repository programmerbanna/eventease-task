'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_EVENT } from '@/graphql/mutations/event.mutations';
import CreateEventForm from '@/components/events/CreateEventForm';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useNotifications } from '@/hooks/useNotifications';
import type { CreateEventInput } from '@/types/event.types';

export default function CreateEventPage() {
    const router = useRouter();
    const { addNotification } = useNotifications();
    const [createEvent] = useMutation(CREATE_EVENT);

    const handleCreateEvent = async (eventData: CreateEventInput) => {
        try {
            await createEvent({
                variables: { createEventInput: eventData }
            });
            addNotification({
                type: 'success',
                message: 'Event created successfully'
            });
            router.push('/dashboard');
        } catch (error) {
            addNotification({
                type: 'error',
                message: 'Failed to create event'
            });
        }
    };

    return (
        <ProtectedRoute>
            <ProtectedLayout>
                <div className="max-w-2xl mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
                    <CreateEventForm onSubmit={handleCreateEvent} />
                </div>
            </ProtectedLayout>
        </ProtectedRoute>
    );
}