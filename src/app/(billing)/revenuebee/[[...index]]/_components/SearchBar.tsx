// components/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, Zap } from "lucide-react";
import Actions from "./HomePage/SearchActions";

interface SearchBarProps {
    onSearch?: (query: string) => void;
    initialValue?: string;
    isCanvasOpen?: boolean;
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
                                                 onSearch,
                                                 initialValue = "",
                                                 isCanvasOpen = false
                                             }) => {
    const [searchText, setSearchText] = useState(initialValue);
    const [placeholder, setPlaceholder] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const typingRef = useRef<NodeJS.Timeout | null>(null);
    const zapButtonRef = useRef<HTMLButtonElement>(null);

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
            setIsActionMenuOpen(false);
        }
    };

    const toggleActionMenu = () => {
        setIsActionMenuOpen(!isActionMenuOpen);
    };

    const handleActionItemClick = (itemTitle: string) => {
        setSearchText(itemTitle);
        if (onSearch) {
            onSearch(itemTitle);
        }
    };

    const isTyping = searchText.trim().length > 0;

    return (
        <div className="sticky bottom-0 w-full flex justify-center z-40">
            <div className={`w-full ${isCanvasOpen ? 'max-w-xl' : 'max-w-3xl'} mx-auto`}>
                <form onSubmit={handleSubmit} className="relative">
                    {/* Zap Icon */}
                    <button
                        type="button"
                        ref={zapButtonRef}
                        onClick={toggleActionMenu}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                        <Zap size={20} />
                    </button>

                    {/* Input Box */}
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder={placeholder}
                        className="w-full h-14 pl-12 pr-24 text-lg bg-white border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder-gray-400"
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
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            <Send size={18} />
                        </button>
                    </div>

                    {/* Actions Menu Component */}
                    <Actions
                        isOpen={isActionMenuOpen}
                        onClose={() => setIsActionMenuOpen(false)}
                        onItemClick={handleActionItemClick}
                    />
                </form>
            </div>
        </div>
    );
};

export default SearchBar;