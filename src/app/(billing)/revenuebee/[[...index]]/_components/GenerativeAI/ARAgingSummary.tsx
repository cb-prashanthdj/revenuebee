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
  onShowRemainerEmail: () => void;
}

const ARAgingSummary: React.FC<ARAgingSummaryProps> = ({
  sections,
  onViewCustomers,
  onRequestPaymentMethodUpdate,
  onSendPaymentReminders,
  onPauseSubscriptions,
  onCancelSubscriptions,
  onShowRemainerEmail,
}) => {
  const [isPaymentReminderModalOpen, setIsPaymentReminderModalOpen] =
    useState(false);
  const [emailData, setEmailData] = useState<any>(null);

  const handleSendPaymentReminders = (fromEmail: string) => {
    const totalCount = sections.reduce(
      (total, section) => total + section.count,
      0
    );

    const emailData = {
      count: totalCount,
      sentAt: new Date(),
      fromEmail: fromEmail,
      emailContent: `Dear {customer_name},
      // ... rest of the email content ...`,
    };

    setEmailData(emailData);
    onSendPaymentReminders(fromEmail);
    setIsPaymentReminderModalOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(date)
      .replace(",", "");
  };

  return (
    <div className="space-y-6">
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
            <p className="text-sm text-gray-600 mb-2">{section.description}</p>
            <div className="flex items-center">
              <span className="text-3xl font-bold mr-2">{section.count}</span>
              <span className="text-gray-600">items</span>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button onClick={onRequestPaymentMethodUpdate} fullWidth={true}>
            <RefreshCcw size={16} className="mr-2" />
            Request payment method update
          </Button>
          <Button
            onClick={() => setIsPaymentReminderModalOpen(true)}
            fullWidth={true}
          >
            <Mail size={16} className="mr-2" />
            Send payment reminder emails
          </Button>

          <Button
            variant="neutral"
            onClick={onPauseSubscriptions}
            fullWidth={true}
          >
            <Pause size={16} className="mr-2" />
            Pause subscriptions
          </Button>
          <Button
            variant="neutral"
            onClick={onCancelSubscriptions}
            fullWidth={true}
          >
            <X size={16} className="mr-2" />
            Cancel subscriptions
          </Button>
        </div>
      </div>

      {emailData && (
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
          <p className="mb-4">
            Payment reminder emails have been sent successfully.
          </p>
          <div className="mb-4">
            <h4 className="font-semibold">Payment Reminder Emails</h4>
            <p className="text-sm text-gray-600">
              Sent to: {emailData.count} customers
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(emailData.sentAt)}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={onShowRemainerEmail}>Show email</Button>
            <Button variant="neutral" onClick={onRequestPaymentMethodUpdate}>
              Automate this workflow
            </Button>
          </div>
        </div>
      )}

      <PaymentRemainderModal
        isOpen={isPaymentReminderModalOpen}
        onClose={() => setIsPaymentReminderModalOpen(false)}
        onSend={handleSendPaymentReminders}
        emailData={emailData}
      />
    </div>
  );
};

export default ARAgingSummary;
