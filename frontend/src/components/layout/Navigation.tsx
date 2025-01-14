import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavigationProps {
    userName: string;
    onLogout: () => Promise<void>;
}

export default function Navigation({ userName, onLogout }: NavigationProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await onLogout();
        router.push('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            href="/dashboard"
                            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200"
                        >
                            EventEase
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 dark:text-gray-300">
                            Welcome, {userName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}