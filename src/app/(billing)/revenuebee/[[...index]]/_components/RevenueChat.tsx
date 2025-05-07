import React, { useState, useEffect } from "react";
import SavedView from "./SavedView";
import SearchBar from "./SearchBar";
import SearchResultsView from "./GenerativeAI/ResultsView";

const RevenueChat: React.FC = () => {
    const [headingIndex, setHeadingIndex] = useState(0);
    const [subHeadingIndex, setSubHeadingIndex] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const headings = [
        "Revenue growth management, reimagined.",
    ];

    const subHeadings = [
        "Your AI agent for revenue growth management.",
        "Maximize margins with real-time insights.",
        "Identify top-performing customers instantly.",
        "Detect revenue leakage before it’s too late.",
        "Turn data into profitable decisions.",
        "Smarter decisions. Higher revenue.",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(false); // Start fade-out
            setTimeout(() => {
                setSubHeadingIndex(prev => (prev + 1) % subHeadings.length);
                setAnimate(true);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = (query: string) => {

        setSearchQuery(query);
        setIsSearching(true);
    };

    const handleBack = () => {
        setIsSearching(false);
    };

    if (isSearching) {
        return (
            <SearchResultsView
                query={searchQuery}
                onBack={handleBack}
                onSearch={handleSearch}
            />
        );
    }

    return (
        <div className="flex flex-col w-full overscroll-none">
            <div className="h-32"></div>

            <div className="text-center mb-8 px-4">
                <h1 className="text-4xl font-bold mb-3 transition-opacity duration-500">
                    {headings[headingIndex]}
                </h1>

                <p
                    className={`text-xl text-gray-600 transform transition-all duration-500 ease-in-out
                    ${animate ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`}
                >
                    {subHeadings[subHeadingIndex]}
                </p>
            </div>

            <div className="mb-24">
                <SearchBar
                    onSearch={handleSearch}
                />
            </div>


            <div className="w-full flex justify-center">
                <SavedView />
            </div>
        </div>
    );
};

export default RevenueChat;
