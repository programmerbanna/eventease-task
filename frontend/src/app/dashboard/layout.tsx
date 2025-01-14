'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <>{children}</>;
}