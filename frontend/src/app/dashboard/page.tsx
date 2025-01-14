'use client';

import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '@/graphql/queries/event.queries';
import { REGISTER_ATTENDEE, UNREGISTER_ATTENDEE } from '@/graphql/mutations/attendee.mutations';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import EventList from '@/components/events/EventList';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const { addNotification } = useNotifications();
    const { data, loading: isEventsLoading, error } = useQuery(GET_EVENTS);

    const [registerAttendee] = useMutation(REGISTER_ATTENDEE);
    const [unregisterAttendee] = useMutation(UNREGISTER_ATTENDEE);

    const handleRegister = async (eventId: string) => {
        try {
            await registerAttendee({ variables: { eventId } });
            addNotification({
                type: 'success',
                message: 'Successfully registered for event',
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: 'Failed to register for event',
            });
        }
    };

    const handleUnregister = async (eventId: string) => {
        try {
            await unregisterAttendee({ variables: { eventId } });
            addNotification({
                type: 'success',
                message: 'Successfully unregistered from event',
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: 'Failed to unregister from event',
            });
        }
    };

    if (!user?.id) {
        return null;
    }

    return (
        <ProtectedRoute>
            <ProtectedLayout>
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Events</h1>
                        <Link
                            href="/events/create"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Create Event
                        </Link>
                    </div>
                    <EventList
                        events={data?.findAllEvents || []}
                        onRegister={handleRegister}
                        onUnregister={handleUnregister}
                        currentUserId={user.id}
                    />
                </div>
            </ProtectedLayout>
        </ProtectedRoute>
    );
}