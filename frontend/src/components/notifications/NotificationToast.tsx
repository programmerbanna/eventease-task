import { Notification } from '@/types/notification.types';

interface NotificationToastProps {
    notification: Notification;
    onClose: (id: string) => void;
}

export default function NotificationToast({ notification, onClose }: NotificationToastProps) {
    const bgColor = notification.type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex justify-between items-center min-w-[300px]`}>
            <p>{notification.message}</p>
            <button
                onClick={() => onClose(notification.id)}
                className="ml-4 text-white hover:text-gray-200"
            >
                ×
            </button>
        </div>
    );
}