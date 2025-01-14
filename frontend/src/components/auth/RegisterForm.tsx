import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { RegisterInput } from '@/types/auth.types';
import { registerSchema } from '@/schemas/auth.schema';

interface RegisterFormProps {
    onSubmit: (values: RegisterInput) => Promise<void>;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
    const initialValues: RegisterInput = {
        name: '',
        email: '',
        password: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
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
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <Field
                            type="text"
                            name="name"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

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
                        {isSubmitting ? 'Creating account...' : 'Register'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}