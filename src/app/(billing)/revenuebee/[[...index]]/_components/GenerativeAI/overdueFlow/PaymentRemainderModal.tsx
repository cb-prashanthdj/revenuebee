// components/PaymentRemainderModal.tsx
import React, { useState } from "react";
import { Button, SModal } from "cb-sting-react-ts";

interface PaymentRemainderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (fromEmail: string) => void;
    children?: React.ReactNode;
}

const PaymentRemainderModal: React.FC<PaymentRemainderModalProps> = ({
                                                                         isOpen,
                                                                         onClose,
                                                                         onSend,
                                                                     }) => {
    const [fromEmail, setFromEmail] = useState("billing@yourcompany.com");

    if (!isOpen) return null;

    return (
        <SModal.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SModal.Content
                padding="large"
                size="small"
                space="regular"
                variant="default"
            >
                <SModal.Header showCloseButton>
                    <SModal.Title textSize="large">
                        Send Payment Reminder Emails
                    </SModal.Title>
                </SModal.Header>
                <SModal.Body className="py-4">

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
                            <p className="mb-4">We hope this message finds you well. Our records indicate that you have
                                an outstanding invoice that is currently overdue.</p>
                            <p className="mb-4 ">[Update Payment Method]</p>
                            <p className="mb-4 ">We kindly request that you settle this payment at your earliest
                                convenience to maintain your account in good standing.</p>
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold text-gray-700">Invoice</h1>
                            </div>
                            <div className="space-y-2">
                                <ul className=" divide-gray-200">
                                    <li className=" flex">
                                        <span className="w-40 font-medium">Invoice Number:</span>
                                        <span id="invoice-number" className="flex-1">{'{invoice_number}'}</span>
                                    </li>
                                    <li className=" flex">
                                        <span className="w-40 font-medium">Amount Due:</span>
                                        <span id="amount-due" className="flex-1">{'{amount_due}'}</span>
                                    </li>
                                    <li className=" flex">
                                        <span className="w-40 font-medium">Due Date:</span>
                                        <span id="due-date" className="flex-1">{'{due_date}'}</span>
                                    </li>
                                    <li className=" flex">
                                        <span className="w-40 font-medium">Days Overdue:</span>
                                        <span id="days-overdue"
                                              className="flex-1  font-semibold">{'{days_overdue}'}</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="mb-4">Thank you for your prompt attention to this matter.</p>
                            <p>
                                Best regards,<br/>
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
                            Send Remainders
                        </Button>
                    </SModal.Close>
                </SModal.Footer>
            </SModal.Content>
        </SModal.Root>
    );
};

export default PaymentRemainderModal;