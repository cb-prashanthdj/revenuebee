export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]">
            <div className="text-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
                {/* Loading Message */}
                <p className="mt-4 text-lg font-medium text-white">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
}