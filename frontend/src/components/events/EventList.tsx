import { format } from 'date-fns';
import type { Event } from '@/types/event.types';

interface EventListProps {
    events: Event[];
    onRegister: (eventId: string) => Promise<void>;
    onUnregister: (eventId: string) => Promise<void>;
    currentUserId: string;
}

export default function EventList({ events, onRegister, onUnregister, currentUserId }: EventListProps) {
    const isRegistered = (event: Event) =>
        event.attendees.some(attendee => attendee.id === currentUserId);

    const isCreator = (event: Event) => event.creatorId === currentUserId;

    const isEventFull = (event: Event) =>
        event.attendees.length >= event.maxAttendees;

    return (
        <div className="space-y-6">
            {events.map((event) => (
                <div key={event.id} className="border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                        </div>
                        {!isCreator(event) && (
                            <button
                                onClick={() => isRegistered(event)
                                    ? onUnregister(event.id)
                                    : onRegister(event.id)
                                }
                                disabled={!isRegistered(event) && isEventFull(event)}
                                className={`px-4 py-2 rounded-md ${isRegistered(event)
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : isEventFull(event)
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                {isRegistered(event)
                                    ? 'Unregister'
                                    : isEventFull(event)
                                        ? 'Event Full'
                                        : 'Register'}
                            </button>
                        )}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>📍 {event.location}</p>
                        <p>📅 {format(new Date(event.date), 'PPP')}</p>
                        <p>👥 {event.attendees.length}/{event.maxAttendees} attendees</p>
                    </div>
                </div>
            ))}
        </div>
    );
}