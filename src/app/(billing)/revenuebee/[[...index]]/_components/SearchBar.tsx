// components/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, Zap, Clock } from "lucide-react";
import Actions from "./HomePage/SearchActions";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
  isCanvasOpen?: boolean;
}

interface RecentSearch {
  id: number;
  query: string;
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
  isCanvasOpen = false,
}) => {
  const [searchText, setSearchText] = useState(initialValue);
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const zapButtonRef = useRef<HTMLButtonElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches] = useState<RecentSearch[]>([
    { id: 1, query: "Create subscription" },
    { id: 2, query: "Show overdue customers" },
    {
      id: 3,
      query: "What opportunities do I have to improve my revenue growth?",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleFocus = () => setIsFocused(true);

  // Use a delay to allow click events to complete before removing the dropdown
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  const handleRecentSearchClick = (query: string) => {
    // Execute search immediately
    if (onSearch) {
      // Set the text first to show feedback to the user
      setSearchText(query);

      // Execute the search with the query
      onSearch(query);

      // Close any open menus
      setIsActionMenuOpen(false);

      // Focus the input after selecting an item
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const isTyping = searchText.trim().length > 0;

  return (
    <div className="sticky bottom-0 w-full flex justify-center z-40">
      <div
        className={`w-full ${
          isCanvasOpen ? "max-w-xl" : "max-w-3xl"
        } mx-auto relative`}
      >
        <form onSubmit={handleSubmit} className="relative">
          {/* Zap Icon */}
          <button
            type="button"
            ref={zapButtonRef}
            onClick={toggleActionMenu}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-deep-dark transition-colors focus:outline-none"
          >
            <Zap size={20} />
          </button>

          {/* Input Box */}
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="w-full h-14 pl-12 pr-24 text-lg bg-white border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-brand-deep-dark transition-all placeholder-gray-400"
          />

          {/* Mic + Send Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              className="text-gray-400 hover:text-brand-deep-dark focus:outline-none"
            >
              <Mic size={18} />
            </button>

            <button
              type="submit"
              className={`focus:outline-none p-2 rounded-full transition-colors ${
                isTyping
                  ? "bg-brand-deep-dark text-white hover:bg-brand-blue-dark"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </form>

        {/* Recent Searches Dropdown */}
        {isFocused && !isTyping && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {recentSearches.map((search) => (
              <button
                key={search.id}
                onMouseDown={(e) => {
                  // Use mouseDown instead of click to avoid blur event issues
                  e.preventDefault();
                  handleRecentSearchClick(search.query);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-left"
              >
                <Clock size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-700 text-lg truncate">
                  {search.query}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Actions Menu Component */}
        <Actions
          isOpen={isActionMenuOpen}
          onClose={() => setIsActionMenuOpen(false)}
          onItemClick={handleActionItemClick}
        />
      </div>
    </div>
  );
};

export default SearchBar;
