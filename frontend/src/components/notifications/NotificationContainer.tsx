'use client';

import { useNotificationContext } from '@/providers/NotificationProvider';
import NotificationToast from './NotificationToast';

export default function NotificationContainer() {
    const { notifications, removeNotification } = useNotificationContext();

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-4">
            {notifications.map((notification) => (
                <NotificationToast
                    key={notification.id}
                    notification={notification}
                    onClose={removeNotification}
                />
            ))}
        </div>
    );
}