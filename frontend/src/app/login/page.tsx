'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/mutations/auth.mutations';
import LoginForm from '@/components/auth/LoginForm';
import type { LoginInput } from '@/types/auth.types';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [login] = useMutation(LOGIN);

    const handleSubmit = async (values: LoginInput) => {
        try {
            const { data } = await login({ variables: values });
            if (data?.login) {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-3xl font-bold text-center">Login to EventEase</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
                )}
                <LoginForm onSubmit={handleSubmit} />
                <p className="text-center">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}