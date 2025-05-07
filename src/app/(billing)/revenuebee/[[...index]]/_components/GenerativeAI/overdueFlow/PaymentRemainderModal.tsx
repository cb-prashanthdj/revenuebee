// components/PaymentRemainderModal.tsx
import React, { useState } from "react";
import { Button, SModal } from "cb-sting-react-ts";

interface PaymentRemainderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerCount?: number;
  onSend: (fromEmail: string) => void;
  emailData?: {
    count: number;
    sentAt: Date;
    fromEmail: string;
  } | null;
}

const PaymentRemainderModal: React.FC<PaymentRemainderModalProps> = ({
  isOpen,
  onClose,
  onSend,
  customerCount,
  emailData,
}) => {
  const [fromEmail, setFromEmail] = useState("billing@yourcompany.com");
  const [emailContent, setEmailContent] = useState(`Dear {customer_name},

We hope this message finds you well. Our records indicate that you have an outstanding invoice that is currently overdue.

Invoice Details:
- Invoice Number: {invoice_number}
- Amount Due: {amount_due}
- Due Date: {due_date}
- Days Overdue: {days_overdue}

We kindly request that you settle this payment at your earliest convenience to maintain your account in good standing.

[Pay Now: https://payment.yourcompany.com/pay/{invoice_id}]

If you have any questions or concerns regarding this invoice, please don't hesitate to contact our billing department.

Thank you for your prompt attention to this matter.

Best regards,
Your Company Billing Team`);

  // Add a function to format the email content for display
  const formatEmailContent = (content: string) => {
    return content.replace(
      /<a href="(.*?)">(.*?)<\/a>/g,
      (match, url, text) => `[${text}: ${url}]`
    );
  };

  // Add a function to format the date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSend = () => {
    onSend(fromEmail);
    onClose();
  };

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
            {emailData
              ? "Payment Reminder Email"
              : "Send Payment Reminder Emails"}
          </SModal.Title>
        </SModal.Header>
        <SModal.Body className="py-4">
          {emailData ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-500">
                  From: {emailData.fromEmail}
                </div>
                <div className="text-sm text-gray-500">
                  To: {emailData.count} Customers
                </div>
                <div className="text-sm text-gray-500">
                  Sent: {formatDate(emailData.sentAt)}
                </div>
              </div>
              <div className="whitespace-pre-wrap font-normal text-sm">
                {emailContent}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">From</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md "
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

              <div>
                <label className="block text-gray-700 mb-2">
                  Email Content
                </label>
                <textarea
                  className="w-full h-56 px-3 py-2 border rounded-md focus:outline-none font-normal text-sm whitespace-pre-wrap"
                  value={formatEmailContent(emailContent)}
                  onChange={(e) => setEmailContent(e.target.value)}
                  style={{
                    lineHeight: "1.5",
                    fontSize: "14px",
                  }}
                />
              </div>
            </>
          )}
        </SModal.Body>
        {!emailData && (
          <SModal.Footer>
            <SModal.Close asChild>
              <Button variant={"neutral"}>Cancel</Button>
            </SModal.Close>
            <Button onClick={handleSend}>Send Reminders</Button>
          </SModal.Footer>
        )}
      </SModal.Content>
    </SModal.Root>
  );
};

export default PaymentRemainderModal;
