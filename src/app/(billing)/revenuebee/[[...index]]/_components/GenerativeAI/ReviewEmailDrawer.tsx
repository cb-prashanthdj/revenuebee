// components/EmailContent.tsx
import React from 'react';
import { Button } from 'cb-sting-react-ts';

interface EmailContentProps {
    customerCount: number;
    sentAt?: Date;
    fromEmail?: string;
    onClose?: () => void;
    showFooter?: boolean;
}

const EmailContent: React.FC<EmailContentProps> = ({
                                                       customerCount,
                                                       sentAt,
                                                       fromEmail = 'billing@yourcompany.com',
                                                       onClose,
                                                       showFooter = false
                                                   }) => {
    // Format date for display
    const formatDate = (date?: Date) => {
        if (!date) return '';

        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date).replace(',', '');
    };

    return (
        <>
            <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
                <div className="bg-white rounded-lg border p-6 mb-6">
                    <div className="flex justify-between mb-6">
                        <div>
                            <div className="text-sm font-semibold mb-1">From:</div>
                            <div className="text-sm">{fromEmail}</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold mb-1">To:</div>
                            <div className="text-sm">{customerCount} customers</div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 my-4"></div>

                    <div className="border rounded-md p-6 bg-gray-50">
                        <p className="mb-4">Dear {'{customer_name}'},</p>
                        <p className="mb-4">We noticed that we need to update your payment method information.</p>
                        <p className="mb-4 bg-gray-200 text-center py-2 rounded-md text-blue-700 font-medium">[Update Payment Method]</p>
                        <p className="mb-4">Thank you for your prompt attention to this matter.</p>
                        <p>
                            Best regards,<br />
                            Acme Corp
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Email Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm font-semibold mb-1">Subject</div>
                                <div className="text-sm">Payment Method Update Request</div>
                            </div>
                            <div>
                                <div className="text-sm font-semibold mb-1">Sent</div>
                                <div className="text-sm">{formatDate(sentAt)}</div>
                            </div>
                            <div>
                                <div className="text-sm font-semibold mb-1">Recipients</div>
                                <div className="text-sm">{customerCount} customer{customerCount !== 1 ? 's' : ''}</div>
                            </div>
                            <div>
                                <div className="text-sm font-semibold mb-1">Status</div>
                                <div className="text-sm flex itemcenter">
                                    Sent
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showFooter && (
                <div className="border-t border-gray-200 p-4 flex justify-start">
                    <Button variant="neutral" onClick={onClose}>
                        Close
                    </Button>
                </div>
            )}
        </>
    );
};

export default EmailContent;