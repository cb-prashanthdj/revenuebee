import React from "react";
import { Button } from "cb-sting-react-ts";

interface EmailContentProps {
  emailData?: {
    customerCount: number;
    fromEmail?: string;
    content?: string;
  };
  onClose?: () => void;
  showFooter?: boolean;
}

const UpgradeEmail: React.FC<EmailContentProps> = ({
  emailData,
  onClose,
  showFooter = false,
}) => {
  console.log(emailData);
  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "";

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

  return (
    <>
      <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-sm font-semibold mb-1">From:</div>
              <div className="text-sm">{emailData?.fromEmail}</div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-1">To:</div>
              <div className="text-sm">
                {emailData?.customerCount} customers
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <pre className="border rounded-md p-6 bg-gray-50">
            {emailData?.content}
          </pre>
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

export default UpgradeEmail;
