export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center" role="status">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            <span className="sr-only">Loading...</span>
        </div>
    );
}