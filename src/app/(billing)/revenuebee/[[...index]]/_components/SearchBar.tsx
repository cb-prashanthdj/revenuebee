import React, { useState, useEffect, useRef } from "react";
import { Mic, SendIcon, Zap, X } from "lucide-react";

interface SearchBarProps {
    position?: "center" | "bottom" | "top";
    onSearch?: (query: string) => void;
    initialValue?: string;
}

interface ActionItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

// Sample data for action items
const actionCategories = [
    {
        id: "customers",
        title: "Customers",
        items: [
            {
                id: "customers-at-risk",
                title: "List customers at risk of churn",
                description: "Find customers who might churn with MRR > $500",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">👥</div>
            },
            {
                id: "create-customer",
                title: "Create customer",
                description: "Add a new customer to your account",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">+</div>
            },
            {
                id: "update-customer",
                title: "Update customer",
                description: "Modify existing customer details",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">✏️</div>
            }
        ]
    },
    {
        id: "subscriptions",
        title: "Subscriptions",
        items: [
            {
                id: "view-all-subs",
                title: "View all subscriptions",
                description: "Browse and manage active subscriptions",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">📊</div>
            },
            {
                id: "create-subscription",
                title: "Create subscription",
                description: "Start a new subscription for a customer",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">+</div>
            },
            {
                id: "pause-subscription",
                title: "Pause subscription",
                description: "Temporarily pause an active subscription",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">⏸️</div>
            }
        ]
    },
    {
        id: "analytics",
        title: "Reports & Analytics",
        items: [
            {
                id: "revenue-analytics",
                title: "Revenue by region",
                description: "Identify top 10 revenue-generating regions this quarter",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">📈</div>
            },
            {
                id: "missed-renewals",
                title: "Missed renewal opportunities",
                description: "Highlight accounts with missed renewal opportunities",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">🔍</div>
            },
            {
                id: "user-drop",
                title: "User activity analysis",
                description: "Detect unusual drop in weekly active users",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">📉</div>
            }
        ]
    }
];

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
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("customers");
    const typingRef = useRef<NodeJS.Timeout | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
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

    // Click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                zapButtonRef.current &&
                !zapButtonRef.current.contains(event.target as Node)
            ) {
                setIsActionMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleActionItemClick = (item: ActionItem) => {
        setSearchText(item.title);
        if (onSearch) {
            onSearch(item.title);
        }
        setIsActionMenuOpen(false);
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
                <button
                    type="button"
                    ref={zapButtonRef}
                    onClick={toggleActionMenu}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors focus:outline-none"
                >
                    <Zap size={20} />
                </button>

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

                {/* Action Menu */}
                {isActionMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute top-16 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                    >
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-semibold text-lg">Actions</h3>
                            <button
                                onClick={() => setIsActionMenuOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b">
                            {actionCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleTabChange(category.id)}
                                    className={`px-4 py-3 flex items-center gap-2 ${
                                        activeTab === category.id
                                            ? "border-b-2 border-purple-600 text-purple-600 font-medium"
                                            : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>

                        {/* Action Items */}
                        <div className="p-2">
                            {actionCategories
                                .find(category => category.id === activeTab)?.items
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleActionItemClick(item)}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                    >
                                        {item.icon}
                                        <div>
                                            <h4 className="font-medium">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;