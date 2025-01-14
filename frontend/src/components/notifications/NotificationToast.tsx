import { Notification } from '@/types/notification.types';

interface NotificationToastProps {
    notification: Notification;
    onClose: (id: string) => void;
}

export default function NotificationToast({ notification, onClose }: NotificationToastProps) {
    const getBackgroundColor = () => {
        switch (notification.type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'info':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className={`${getBackgroundColor()} text-white p-4 rounded-lg shadow-lg flex justify-between items-center min-w-[300px] animate-fade-in`}
            role="alert"
        >
            <p>{notification.message}</p>
            <button
                onClick={() => onClose(notification.id)}
                className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
}