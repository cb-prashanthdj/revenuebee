import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button, SModal } from 'cb-sting-react-ts';

// Define the interface for the EmailModal component
interface EmailModalProps {
    onSend: (fromEmail: string) => void;
    customerCount: number;
    children?: React.ReactNode; // To accept trigger button as children
}

// Create a component that can be used with direct triggers
const EmailModal: React.FC<EmailModalProps> = ({
                                                   onSend,
                                                   customerCount,
                                                   children
                                               }) => {
    const [fromEmail, setFromEmail] = useState('billing@yourcompany.com');

    return (
        <SModal.Root>
            {/* Either use children as trigger or provide a default one */}
            {children ? (
                <SModal.Trigger asChild>
                    {children}
                </SModal.Trigger>
            ) : null}

            <SModal.Content
                padding="large"
                size="small"
                space="regular"
                variant="default"
            >
                <SModal.Header showCloseButton>
                    <SModal.Title textSize="large">
                        Send Payment Method Update Request
                    </SModal.Title>
                </SModal.Header>
                <SModal.Body className="py-4">
                    <p className="text-gray-600 mb-6">
                        This email will be sent to {customerCount} selected customer(s)
                    </p>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">From</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={fromEmail}
                            onChange={(e) => setFromEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">To</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md bg-gray-50"
                            value={`customer0@example.com, customer1@example.com, customer2@example.com, ...`}
                            readOnly
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Email Preview</label>
                        <div className="border rounded-md p-4">
                            <p className="mb-4">Dear {'{customer_name}'},</p>
                            <p className="mb-4">We noticed that we need to update your payment method information.</p>
                            <p className="mb-4 bg-gray-100 text-center py-2 rounded-md">[Update Payment Method]</p>
                            <p className="mb-4">Thank you for your prompt attention to this matter.</p>
                            <p>
                                Best regards,<br />
                                Acme Corp
                            </p>
                        </div>
                    </div>
                </SModal.Body>
                <SModal.Footer>
                    <SModal.Close asChild>
                        <Button variant={'neutral'}>
                            Cancel
                        </Button>
                    </SModal.Close>
                    <SModal.Close asChild>
                        <Button onClick={() => onSend(fromEmail)}>
                            Send Emails
                        </Button>
                    </SModal.Close>
                </SModal.Footer>
            </SModal.Content>
        </SModal.Root>
    );
};

export default EmailModal;