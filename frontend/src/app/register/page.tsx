'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { REGISTER } from '@/graphql/mutations/auth.mutations';
import RegisterForm from '@/components/auth/RegisterForm';
import type { RegisterInput } from '@/types/auth.types';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [register] = useMutation(REGISTER);

    const handleSubmit = async (values: RegisterInput) => {
        try {
            const { data } = await register({ variables: values });
            if (data?.register) {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-3xl font-bold text-center">Create an Account</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
                )}
                <RegisterForm onSubmit={handleSubmit} />
                <p className="text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}