import React, { useState, useEffect, useRef } from "react";
import { Mic, SendIcon, Zap } from "lucide-react";

interface SearchBarProps {
    position?: "center" | "bottom" | "top";
    onSearch?: (query: string) => void;
    initialValue?: string;
}

const placeholderOptions = [
    "List customers at risk of churn with MRR > $500",
    "Set up a workflow to email customers after failed payments",
    "Identify top 10 revenue-generating regions this quarter",
    "Highlight accounts with missed renewal opportunities",
    "Detect unusual drop in weekly active users",
    "Show plans with high downgrade rate",
];

const SearchBar: React.FC<SearchBarProps> = ({
                                                 position = "center",
                                                 onSearch,
                                                 initialValue = ""
                                             }) => {
    const [searchText, setSearchText] = useState(initialValue);
    const [placeholder, setPlaceholder] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const typingRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setSearchText(initialValue);
    }, [initialValue]);

    // Typing effect for placeholder
    useEffect(() => {
        const currentSentence = placeholderOptions[placeholderIndex];
        if (charIndex <= currentSentence.length) {
            typingRef.current = setTimeout(() => {
                setPlaceholder(currentSentence.slice(0, charIndex));
                setCharIndex((prev) => prev + 1);
            }, 50);
        } else {
            typingRef.current = setTimeout(() => {
                setCharIndex(0);
                setPlaceholderIndex((prev) => (prev + 1) % placeholderOptions.length);
            }, 2000);
        }

        return () => {
            if (typingRef.current) clearTimeout(typingRef.current);
        };
    }, [charIndex, placeholderIndex]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && searchText.trim()) {
            onSearch(searchText);
        }
    };

    const containerStyles =
        position === "bottom"
            ? "fixed bottom-6 left-0 right-0 z-20 px-4 max-w-2xl mx-auto"
            : position === "top"
                ? "w-full max-w-2xl mx-auto px-4 mb-6"
                : "w-full max-w-2xl mx-auto px-4";

    const isTyping = searchText.trim().length > 0;

    return (
        <div className={containerStyles}>
            <form onSubmit={handleSubmit} className="relative">
                {/* Zap Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Zap size={20} />
                </div>

                {/* Input Box */}
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    className="w-full h-14 pl-12 pr-24 text-lg bg-white border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-400"
                />

                {/* Mic + Send Icons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <Mic size={18} />
                    </button>

                    <button
                        type="submit"
                        className={`focus:outline-none p-2 rounded-full transition-colors ${
                            isTyping
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        <SendIcon size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
