// components/EmailModal.tsx
import React, { useState } from "react";
import { Button } from "cb-sting-react-ts";

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (fromEmail: string) => void;
    customerCount: number;
    children?: React.ReactNode;
}

const EmailModal: React.FC<EmailModalProps> = ({
                                                   isOpen,
                                                   onClose,
                                                   onSend,
                                                   customerCount,
                                                   children
                                               }) => {
    const [fromEmail, setFromEmail] = useState("billing@yourcompany.com");

    if (!isOpen) return null;

    const handleSend = () => {
        onSend(fromEmail);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-xl font-semibold mb-2">
                    Send Payment Method Update Request
                </h2>
                <p className="text-gray-600 mb-6">
                    {customerCount > 0
                        ? `Send to ${customerCount} customers with payment method issues`
                        : "No customers with payment method issues selected"}
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        From
                    </label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        To
                    </label>
                    <div className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-500">
                        {customerCount} customer{customerCount !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Preview
                    </label>
                    <div className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                        <p className="mb-2">Dear {'{customer_name}'},</p>
                        <p className="mb-2">We noticed that we need to update your payment method information.</p>
                        <p className="mb-2">[Update Payment Method]</p>
                        <p className="mb-2">Thank you for your prompt attention to this matter.</p>
                        <p className="mb-1">Best regards,</p>
                        <p>Your Company</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button variant="neutral" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSend}>
                        Send Emails
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Wrapper component that provides a trigger for the modal
const EmailModalWrapper: React.FC<{
    onSend: (fromEmail: string) => void;
    customerCount: number;
    children: React.ReactNode;
}> = ({ onSend, customerCount, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <div onClick={openModal}>
                {children}
            </div>
            <EmailModal
                isOpen={isOpen}
                onClose={closeModal}
                onSend={onSend}
                customerCount={customerCount}
            />
        </>
    );
};

export default EmailModalWrapper;