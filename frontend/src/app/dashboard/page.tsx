'use client';

import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '@/graphql/queries/event.queries';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import EventList from '@/components/events/EventList';
import { useAuth } from '@/hooks/useAuth';
import { useEventAttendance } from '@/hooks/useEventAttendance';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
    const { user } = useAuth();
    const { registerForEvent, unregisterFromEvent } = useEventAttendance();
    const { data, loading: isEventsLoading, error } = useQuery(GET_EVENTS);

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
                        onRegister={registerForEvent}
                        onUnregister={unregisterFromEvent}
                        currentUserId={user.id}
                    />
                </div>
            </ProtectedLayout>
        </ProtectedRoute>
    );
}