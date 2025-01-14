import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from './Navigation';
import NotificationToast from '../notifications/NotificationToast';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useWebSocket } from '@/hooks/useWebSocket';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const router = useRouter();
    const { user, isLoading, logout } = useAuth();
    const { notifications, removeNotification } = useNotifications();

    // Initialize WebSocket connection
    useWebSocket();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation userName={user.name} onLogout={logout} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {notifications.map((notification) => (
                    <NotificationToast
                        key={notification.id}
                        notification={notification}
                        onClose={removeNotification}
                    />
                ))}
            </div>
        </div>
    );
}