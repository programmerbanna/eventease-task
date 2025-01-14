import { Event } from '@/types/event.types';
import { format } from 'date-fns';

interface EventCardProps {
    event: Event;
    onRegister: (eventId: string) => Promise<void>;
    onUnregister: (eventId: string) => Promise<void>;
    isCreator: boolean;
    isRegistered: boolean;
}

export default function EventCard({
    event,
    onRegister,
    onUnregister,
    isCreator,
    isRegistered,
}: EventCardProps) {
    const isFull = event.attendees.length >= event.maxAttendees;

    return (
        <div className="border rounded-lg shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
            </div>

            <div className="space-y-2 text-sm">
                <p className="flex items-center">
                    <span className="font-medium mr-2">📅 Date:</span>
                    {format(new Date(event.date), 'PPP')}
                </p>
                <p className="flex items-center">
                    <span className="font-medium mr-2">📍 Location:</span>
                    {event.location}
                </p>
                <p className="flex items-center">
                    <span className="font-medium mr-2">👥 Attendees:</span>
                    <span className={isFull ? 'text-red-500' : 'text-green-500'}>
                        {event.attendees.length}/{event.maxAttendees}
                    </span>
                </p>
            </div>

            {!isCreator && (
                <div className="space-y-2">
                    <button
                        onClick={() => isRegistered ? onUnregister(event.id) : onRegister(event.id)}
                        disabled={!isRegistered && isFull}
                        className={`w-full py-3 px-4 rounded-md ${isRegistered
                                ? 'bg-red-500 hover:bg-red-600'
                                : isFull
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white transition-colors font-medium`}
                    >
                        {isRegistered
                            ? '❌ Cancel Registration'
                            : isFull
                                ? '🚫 Event Full'
                                : '✅ Join Event'}
                    </button>
                    {!isRegistered && !isFull && (
                        <p className="text-sm text-gray-500 text-center">
                            Click to register for this event
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}