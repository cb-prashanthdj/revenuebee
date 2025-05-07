// components/chatUI/CanvasPanel.tsx
import React from "react";
import { X } from "lucide-react";
import CustomerContent from "../Drawer";
import EmailContent from "../ReviewEmailDrawer";
import WorkflowContent from "../WorkflowDrawer";
import SubscriptionFlow from "../SubscriptionFlow";
import UpgradeEmail from "../UpgradeEmail";
import PaymentRemainderMailDrawer from "../../GenerativeAI/overdueFlow/PaymentRemainderMailDrawer";

interface CanvasPanelProps {
  contentType:
    | "customers"
    | "workflow"
    | "email"
    | "subscription"
    | "upgradeEmail"
    | "remainderEmail"
    | "abExperiment"
    | "abTesting";
  isOpen: boolean;
  title: string;
  activeSection: string | null;
  onClose: () => void;

  // Customer content props
  customers?: any[];
  isSelectMode?: boolean;
  selectedCustomerIds?: string[] | number[]; // Accept both types
  onCustomerSelectionChange?: (selectedIds: string[] | number[]) => void; // Accept both types
  onSendEmailToSelected?: (selectedIds: string[] | number[]) => void;

  // Email content props
  emailData?: {
    customerCount: number;
    sentAt: Date;
    fromEmail: string;
    content?: string;
    count?: number;
  };

  // Workflow content props
  workflowData?: {
    isPaused: boolean;
    daysBeforeExpiry: number;
    days: number;
    hasUnsavedChanges: boolean;
  };
  onDaysChange?: (value: number) => void;
  onSaveWorkflowChanges?: () => void;
  onToggleWorkflowStatus?: () => void;

  // For displaying data count
  getCustomerCount?: () => number;
}

const CanvasPanel: React.FC<CanvasPanelProps> = ({
  contentType,
  isOpen,
  title,
  activeSection,
  onClose,
  customers,
  isSelectMode = false,
  selectedCustomerIds = [],
  onCustomerSelectionChange,
  onSendEmailToSelected,
  emailData,
  workflowData,
  onDaysChange,
  onSaveWorkflowChanges,
  onToggleWorkflowStatus,
  getCustomerCount,
}) => {
  if (!isOpen) return null;

  // Helper function to get subtitle text based on content type
  const getSubtitleText = () => {
    if (contentType === "customers") {
      return isSelectMode
        ? "Select customers to send email"
        : `${getCustomerCount ? getCustomerCount() : 0} customers found`;
    }
    return null;
  };

  // Function to get the appropriate toast hook for components
  const getToastForComponents = () => {
    // In a real implementation, you would use your toast context
    // This is a placeholder function
    return (props: any) => {
      console.log("Toast:", props);
      // Actual implementation would call the real toast function
    };
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
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
        {getSubtitleText() && (
          <div className="text-sm text-gray-600">{getSubtitleText()}</div>
        )}
      </div>

      {/* Dynamic Canvas Content */}
      {contentType === "customers" && (
        <CustomerContent
          title={activeSection || "Customer Data"}
          sectionKey={isSelectMode ? null : activeSection}
          customers={customers}
          onSendEmail={onSendEmailToSelected}
          onClose={onClose}
          showFooter={true}
          isSelectMode={isSelectMode}
          onSelectionChange={onCustomerSelectionChange}
        />
      )}

      {contentType === "email" && emailData && (
        <EmailContent
          customerCount={emailData.customerCount}
          sentAt={emailData.sentAt}
          fromEmail={emailData.fromEmail}
          onClose={onClose}
          showFooter={true}
        />
      )}

      {contentType === "upgradeEmail" && emailData && (
        <UpgradeEmail
          onClose={onClose}
          showFooter={true}
          emailData={emailData}
        />
      )}

      {contentType === "remainderEmail" && emailData && (
        <PaymentRemainderMailDrawer showFooter={true} onClose={onClose} />
      )}

      {contentType === "workflow" && workflowData && (
        <WorkflowContent
          isPaused={workflowData.isPaused}
          daysBeforeExpiry={workflowData.daysBeforeExpiry}
          days={workflowData.days}
          hasUnsavedChanges={workflowData.hasUnsavedChanges}
          onDaysChange={onDaysChange}
          onSaveChanges={onSaveWorkflowChanges}
          onToggleWorkflowStatus={onToggleWorkflowStatus}
          onClose={onClose}
          showFooter={true}
        />
      )}

      {contentType === "subscription" && (
        <div className="flex-1 overflow-auto">
          <SubscriptionFlow onSubmit={onClose} />
        </div>
      )}
    </div>
  );
};

export default CanvasPanel;
