import ProcessingGif from "@/app/assets/img/CB-processing_Orange_v06.gif";
import Image from "next/image";

export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]">
            <div className="text-center">
                {/* Spinner */}
                <Image src={ProcessingGif} alt="Processing..." className="w-30 h-30 rounded-full mx-auto" />                {/* Loading Message */}
                <p className="mt-4 text-lg font-medium text-white">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
}