import React from "react";
import { Button } from "cb-sting-react-ts";

interface PaymentRemainderMailDrawerProps {
  fromEmail?: string;
  onClose?: () => void;
  showFooter?: boolean;
}

const PaymentRemainderMailDrawer: React.FC<PaymentRemainderMailDrawerProps> = ({
  fromEmail = "billing@yourcompany.com",
  onClose,
  showFooter = false,
}) => {
  // Use current time for sent timestamp
  const currentTime = new Date();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .format(date)
      .replace(",", "");
  };

  const emailContent = `Dear {customer_name},

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
Your Company Billing Team`;

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
              <div className="text-sm">All overdue customers</div>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="border rounded-md p-6 bg-gray-50">
            <div className="whitespace-pre-wrap font-normal text-sm">
              {emailContent}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Email Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold mb-1">Subject</div>
                <div className="text-sm">Payment Reminder</div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">Sent</div>
                <div className="text-sm">{formatDate(currentTime)}</div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">Recipients</div>
                <div className="text-sm">All overdue customers</div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">Status</div>
                <div className="text-sm flex items-center">Sent</div>
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

export default PaymentRemainderMailDrawer;
