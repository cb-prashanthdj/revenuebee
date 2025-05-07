// components/ARAgingSummary.tsx
import React, { useState } from "react";
import { Eye, Mail, Pause, X, RefreshCcw } from "lucide-react";
import { Button } from "cb-sting-react-ts";
import { Customer } from "../../../services/CustomerAI";
import PaymentRemainderModal from "../GenerativeAI/overdueFlow/PaymentRemainderModal";

interface ARAgingSummaryProps {
    sections: Array<{
        title: string;
        description: string;
        count: number;
        items: Customer[];
    }>;
    onViewCustomers: (sectionKey: string) => void;
    onRequestPaymentMethodUpdate: () => void;
    onSendPaymentReminders: (fromEmail: string) => void;
    onPauseSubscriptions: () => void;
    onCancelSubscriptions: () => void;
}

const ARAgingSummary: React.FC<ARAgingSummaryProps> = ({
                                                           sections,
                                                           onViewCustomers,
                                                           onRequestPaymentMethodUpdate,
                                                           onSendPaymentReminders,
                                                           onPauseSubscriptions,
                                                           onCancelSubscriptions
                                                       }) => {
    const [isPaymentReminderModalOpen, setIsPaymentReminderModalOpen] = useState(false);

    const handleSendPaymentReminders = (fromEmail: string) => {
        onSendPaymentReminders(fromEmail);
        setIsPaymentReminderModalOpen(false);
        // Modal will close and the parent component will handle showing the confirmation message
    };

    return (
        <div className="bg-neutral-25 rounded-lg p-6 shadow-sm max-w-xl">
            <h2 className="text-xl font-semibold mb-6">
                Here's the AR aging summary of customers with overdue invoices:
            </h2>

            {sections.map((section, index) => (
                <div key={index} className="mb-8">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold">{section.title}</h3>
                        <Button
                            styleType="icon-borderless"
                            variant="neutral"
                            onClick={() => onViewCustomers(section.title)}
                        >
                            <Eye size={18} />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                        {section.description}
                    </p>
                    <div className="flex items-center">
                        <span className="text-3xl font-bold mr-2">{section.count}</span>
                        <span className="text-gray-600">items</span>
                    </div>
                </div>
            ))}

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <Button onClick={onRequestPaymentMethodUpdate} fullWidth={true}>
                    <RefreshCcw size={16} className="mr-2" />
                    Request payment method update
                </Button>

                <Button onClick={() => setIsPaymentReminderModalOpen(true)} fullWidth={true}>
                    <Mail size={16} className="mr-2" />
                    Send payment reminder emails
                </Button>

                <Button variant="neutral" onClick={onPauseSubscriptions} fullWidth={true}>
                    <Pause size={16} className="mr-2" />
                    Pause subscriptions
                </Button>

                <Button variant="neutral" onClick={onCancelSubscriptions} fullWidth={true}>
                    <X size={16} className="mr-2" />
                    Cancel subscriptions
                </Button>
            </div>

            {/* Payment Reminder Modal */}
            <PaymentRemainderModal
                isOpen={isPaymentReminderModalOpen}
                onClose={() => setIsPaymentReminderModalOpen(false)}
                onSend={handleSendPaymentReminders}
            />
        </div>
    );
};

export default ARAgingSummary;