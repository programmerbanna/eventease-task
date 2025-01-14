import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { LoginInput } from '@/types/auth.types';
import { loginSchema } from '@/schemas/auth.schema';

interface LoginFormProps {
    onSubmit: (values: LoginInput) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const initialValues: LoginInput = {
        email: '',
        password: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await onSubmit(values);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <Field
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <Field
                            type="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}