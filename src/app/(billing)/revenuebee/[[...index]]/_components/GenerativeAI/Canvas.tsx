// components/Canvas.tsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "cb-sting-react-ts";
import { X, Save, Mail, FileText, BarChart } from 'lucide-react';
import CustomerTable from './CustomerTable';

interface Customer {
    id: number;
    name: string;
    email: string;
    mrr: number;
    status: 'active' | 'at_risk' | 'churned';
    paymentMethod?: {
        type: string;
        isExpired: boolean;
        expiresIn: number;
    } | null;
}

interface CanvasProps {
    title: string;
    content: any;
    contentType: 'customers' | 'workflow' | 'email';
    isSelectMode?: boolean;
    selectedCustomerIds?: number[];
    onClose: () => void;
    onSelectionChange?: (selectedIds: number[]) => void;
    onSendEmail?: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
                                           title,
                                           content,
                                           contentType,
                                           isSelectMode = false,
                                           selectedCustomerIds = [],
                                           onClose,
                                           onSelectionChange,
                                           onSendEmail
                                       }) => {
    const [activeTab, setActiveTab] = useState<string>(contentType);
    const [editMode, setEditMode] = useState(false);
    const [editContent, setEditContent] = useState<string>('');

    // Format date for display
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date).replace(',', '');
    };

    // Handle save button click
    const handleSave = () => {
        setEditMode(false);
        // Here you would implement saving the edited content
        // For example, dispatch an action or call an API
    };

    // Handle edit button click
    const handleEdit = () => {
        if (contentType === 'email') {
            setEditContent(
                `From: ${content?.fromEmail}\n` +
                `To: ${content?.customerCount} Customers\n` +
                `Sent: ${formatDate(content?.sentAt)}\n\n` +
                'Subject: Payment Method Update Required\n\n' +
                'Dear Customer,\n\n' +
                'We noticed that your payment method needs to be updated. Please log in to your account to update your payment information to avoid any service interruptions.\n\n' +
                'If you have any questions, please don\'t hesitate to contact our support team.\n\n' +
                'Thank you for your business!'
            );
        } else if (contentType === 'workflow') {
            setEditContent(
                `Name: ${content?.name}\n` +
                `Trigger: ${content?.trigger}\n` +
                `Action: ${content?.action}\n` +
                `Status: ${content?.status}\n\n` +
                'Email Template:\n\n' +
                'Subject: Your Payment Method Will Expire Soon\n\n' +
                'Dear Customer,\n\n' +
                'Your payment method will expire in 5 days. Please update your payment information to avoid service interruptions.\n\n' +
                'Thank you!'
            );
        }
        setEditMode(true);
    };

    // Render content based on type
    const renderContent = () => {
        // If in edit mode, show text editor
        if (editMode) {
            return (
                <div className="p-6 h-full">
                    <textarea
                        className="w-full h-full p-4 border border-gray-300 rounded-md resize-none font-mono text-sm"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            <Save size={16} className="mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            );
        }

        switch (contentType) {
            case 'customers':
                return (
                    <div className="flex flex-col h-full">
                        <CustomerTable
                            customers={content || []}
                            selectable={isSelectMode}
                            onSelectionChange={onSelectionChange}
                        />
                        {isSelectMode && selectedCustomerIds && selectedCustomerIds.length > 0 && (
                            <div className="border-t border-gray-200 p-4 flex justify-end">
                                <Button
                                    onClick={onSendEmail}
                                >
                                    <Mail size={16} className="mr-2" />
                                    Send Email ({selectedCustomerIds.length})
                                </Button>
                            </div>
                        )}
                    </div>
                );
            case 'email':
                return (
                    <div className="p-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="mb-4">
                                <div className="text-sm text-gray-500">From: {content?.fromEmail}</div>
                                <div className="text-sm text-gray-500">To: {content?.customerCount} Customers</div>
                                <div className="text-sm text-gray-500">Sent: {formatDate(content?.sentAt)}</div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Payment Method Update Required</h3>
                                <p className="mb-2">Dear Customer,</p>
                                <p className="mb-2">We noticed that your payment method needs to be updated. Please log in to your account to update your payment information to avoid any service interruptions.</p>
                                <p className="mb-2">If you have any questions, please don't hesitate to contact our support team.</p>
                                <p>Thank you for your business!</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button variant="outline" onClick={handleEdit}>
                                    Edit Template
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'workflow':
                return (
                    <div className="p-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">{content?.name}</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm font-medium">Trigger:</div>
                                    <div className="text-sm">{content?.trigger}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm font-medium">Action:</div>
                                    <div className="text-sm">{content?.action}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm font-medium">Status:</div>
                                    <div className="text-sm">{content?.status}</div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Email Template</h4>
                                <div className="text-sm text-gray-700">
                                    <p className="mb-2">Subject: Your Payment Method Will Expire Soon</p>
                                    <p className="mb-2">Dear Customer,</p>
                                    <p className="mb-2">Your payment method will expire in 5 days. Please update your payment information to avoid service interruptions.</p>
                                    <p>Thank you!</p>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Button variant="outline" onClick={handleEdit}>
                                    Edit Workflow
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="p-6 text-center text-gray-500">No content to display</div>;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {!editMode && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="customers" disabled={contentType !== 'customers'} className="flex items-center space-x-1">
                                <BarChart size={16} />
                                <span>Customers</span>
                            </TabsTrigger>
                            <TabsTrigger value="email" disabled={contentType !== 'email'} className="flex items-center space-x-1">
                                <Mail size={16} />
                                <span>Email</span>
                            </TabsTrigger>
                            <TabsTrigger value="workflow" disabled={contentType !== 'workflow'} className="flex items-center space-x-1">
                                <FileText size={16} />
                                <span>Workflow</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}
            </div>

            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Canvas;