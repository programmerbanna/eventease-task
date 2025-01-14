interface FormErrorProps {
    error?: string;
    touched?: boolean;
}

export default function FormError({ error, touched }: FormErrorProps) {
    if (!error || !touched) return null;

    return (
        <div className="text-red-500 text-sm mt-1" role="alert">
            {error}
        </div>
    );
}