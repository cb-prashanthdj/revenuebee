// components/Actions.tsx
import React, { useState, useRef, useEffect } from "react";
import { X, Users, BadgePlus, PenSquare, CreditCard, Banknote,
    LayoutGrid, Plus, Pause, Play, FileText, DollarSign,
    FileX, Receipt, Package, FilePenLine, FileX2, BarChart3,
    FilePlus2, Edit, List, Settings, Grid3X3 } from "lucide-react";

interface ActionItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface ActionCategory {
    id: string;
    title: string;
    items: ActionItem[];
}

interface ActionsProps {
    isOpen: boolean;
    onClose: () => void;
    onItemClick: (itemTitle: string) => void;
}

// Complete action categories based on screenshots
const actionCategories: ActionCategory[] = [
    {
        id: "customers",
        title: "Customers",
        items: [
            {
                id: "view-all-customers",
                title: "View all customers",
                description: "Browse and manage your customer base",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Users size={18} /></div>
            },
            {
                id: "create-customer",
                title: "Create customer",
                description: "Add a new customer to your account",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><BadgePlus size={18} /></div>
            },
            {
                id: "update-customer",
                title: "Update customer",
                description: "Modify existing customer details",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><PenSquare size={18} /></div>
            },
            {
                id: "request-payment-method",
                title: "Request payment method",
                description: "Ask customer to update their payment information",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><CreditCard size={18} /></div>
            },
            {
                id: "create-charge",
                title: "Create charge",
                description: "Add a one-time charge to customer",
                icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Banknote size={18} /></div>
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
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><LayoutGrid size={18} /></div>
            },
            {
                id: "create-subscription",
                title: "Create subscription",
                description: "Start a new subscription for a customer",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><Plus size={18} /></div>
            },
            {
                id: "update-subscription",
                title: "Update subscription",
                description: "Modify subscription details",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><LayoutGrid size={18} /></div>
            },
            {
                id: "pause-subscription",
                title: "Pause subscription",
                description: "Temporarily pause an active subscription",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><Pause size={18} /></div>
            },
            {
                id: "resume-subscription",
                title: "Resume subscription",
                description: "Resume a paused subscription",
                icon: <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><Play size={18} /></div>
            }
        ]
    },
    {
        id: "invoices",
        title: "Invoices & Credit Notes",
        items: [
            {
                id: "view-all-invoices",
                title: "View all invoices",
                description: "Browse and manage your invoices",
                icon: <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><FileText size={18} /></div>
            },
            {
                id: "record-payment",
                title: "Record payment",
                description: "Record a manual payment",
                icon: <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><DollarSign size={18} /></div>
            },
            {
                id: "void-invoice",
                title: "Void invoice",
                description: "Mark an invoice as void",
                icon: <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><FileX size={18} /></div>
            },
            {
                id: "write-off-invoice",
                title: "Write-off invoice",
                description: "Write off an unpaid invoice",
                icon: <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><FileText size={18} /></div>
            },
            {
                id: "create-credit-note",
                title: "Create credit note",
                description: "Issue a credit note",
                icon: <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><Receipt size={18} /></div>
            }
        ]
    },
    {
        id: "products",
        title: "Product Catalog",
        items: [
            {
                id: "view-all-items",
                title: "View all items",
                description: "Browse and manage your product catalog",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Package size={18} /></div>
            },
            {
                id: "create-item",
                title: "Create item",
                description: "Add a new item to your catalog",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Plus size={18} /></div>
            },
            {
                id: "update-item",
                title: "Update item",
                description: "Modify existing item details",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Package size={18} /></div>
            },
            {
                id: "delete-item",
                title: "Delete item",
                description: "Remove an item from your catalog",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><FileX2 size={18} /></div>
            },
            {
                id: "add-price-point",
                title: "Add Price Point",
                description: "Add pricing options to an item",
                icon: <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Package size={18} /></div>
            }
        ]
    },
    {
        id: "reports",
        title: "Reports & Analytics",
        items: [
            {
                id: "view-all-reports",
                title: "View all reports",
                description: "Browse and analyze your reports",
                icon: <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><BarChart3 size={18} /></div>
            },
            {
                id: "create-report",
                title: "Create report",
                description: "Generate a new custom report",
                icon: <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><FilePlus2 size={18} /></div>
            },
            {
                id: "edit-report",
                title: "Edit report",
                description: "Modify an existing report",
                icon: <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Edit size={18} /></div>
            },
            {
                id: "delete-report",
                title: "Delete report",
                description: "Remove a saved report",
                icon: <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><FileX2 size={18} /></div>
            }
        ]
    },
    {
        id: "experiences",
        title: "Customer Experiences",
        items: [
            {
                id: "view-all-pages",
                title: "View all pages",
                description: "Browse and manage your customer pages",
                icon: <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><LayoutGrid size={18} /></div>
            },
            {
                id: "view-all-experiments",
                title: "View all experiments",
                description: "Browse and manage your experiments",
                icon: <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><List size={18} /></div>
            },
            {
                id: "view-all-segments",
                title: "View all audience segments",
                description: "Browse and manage audience segments",
                icon: <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><Grid3X3 size={18} /></div>
            },
            {
                id: "create-page",
                title: "Create page",
                description: "Create a new customer-facing page",
                icon: <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><Plus size={18} /></div>
            },
            {
                id: "create-experiment",
                title: "Create experiment",
                description: "Start a new customer experiment",
                icon: <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600"><Plus size={18} /></div>
            }
        ]
    },
    {
        id: "workflows",
        title: "Automated Workflows",
        items: [
            {
                id: "view-all-workflows",
                title: "View all workflows",
                description: "Browse and manage your automated workflows",
                icon: <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600"><Settings size={18} /></div>
            },
            {
                id: "create-workflow",
                title: "Create workflow",
                description: "Set up a new automated workflow",
                icon: <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600"><Plus size={18} /></div>
            },
            {
                id: "update-workflow",
                title: "Update workflow",
                description: "Modify an existing workflow",
                icon: <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600"><Settings size={18} /></div>
            },
            {
                id: "delete-workflow",
                title: "Delete workflow",
                description: "Remove a workflow",
                icon: <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600"><Settings size={18} /></div>
            }
        ]
    }
];

const Actions: React.FC<ActionsProps> = ({ isOpen, onClose, onItemClick }) => {
    const [activeTab, setActiveTab] = useState("customers");
    const menuRef = useRef<HTMLDivElement>(null);

    // Click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleActionItemClick = (item: ActionItem) => {
        onItemClick(item.title);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="absolute top-16 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold text-lg">Actions</h3>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b overflow-x-auto scrollbar-hide">
                {actionCategories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleTabChange(category.id)}
                        className={`px-4 py-1 flex items-center gap-2 whitespace-nowrap ${
                            activeTab === category.id
                                ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {/* Action Items */}
            <div className="p-2 h-80 overflow-y-auto scrollbar-hide">
                {actionCategories
                    .find(category => category.id === activeTab)?.items
                    .map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleActionItemClick(item)}
                            className="flex items-center gap-4 p-1 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                            <div>{item.icon}</div>
                            <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">{item.title}</h5>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Actions;