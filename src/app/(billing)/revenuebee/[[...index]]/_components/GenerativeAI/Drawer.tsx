// components/CustomerContent.tsx
import React, { useState, useEffect } from "react";
import { Button } from "cb-sting-react-ts";
import CustomerTable from "./CustomerTable";
import CustomerAnalyzer from "../../../services/CustomerAI";
import { Mail } from "lucide-react";

interface CustomerContentProps {
  title: string;
  children?: React.ReactNode;
  sectionKey?: string | null;
  onSendEmail?: (selectedCustomers: string[]) => void;  // Changed to string[] to match with customer IDs
  onClose?: () => void;
  showFooter?: boolean;
  isSelectMode?: boolean;
  customers?: any[];
  customersCount?: number;
  onSelectionChange?: (selectedIds: string[]) => void;  // Changed to string[] to match with customer IDs
}

// Get appropriate customer data based on section title
const getCustomerData = (sectionKey?: string | null) => {
  if (!sectionKey) return [];

  // Get analyzer data
  const analyzer = CustomerAnalyzer;
  const customerData = analyzer.customerData || [];

  // Filter based on section title
  if (sectionKey.toLowerCase().includes("without payment")) {
    return customerData.filter((c) => !c.paymentMethod);
  } else if (sectionKey.toLowerCase().includes("soon-to-expire")) {
    return customerData.filter((c) => c.paymentMethod);
  } else if (sectionKey.toLowerCase().includes("at risk")) {
    return customerData.filter((c) => c.paymentMethod === "at_risk");
  } else if (sectionKey.toLowerCase().includes("active")) {
    return customerData.filter((c) => c.paymentMethod === "active");
  } else if (sectionKey.toLowerCase().includes("churned")) {
    return customerData.filter((c) => c.paymentMethod === "churned");
  }

  // Default return all customers
  return customerData;
};

const CustomerContent: React.FC<CustomerContentProps> = ({
                                                           children,
                                                           sectionKey,
                                                           onSendEmail,
                                                           onClose,
                                                           showFooter = false,
                                                           isSelectMode = true,
                                                           customers,
                                                           customersCount,
                                                           onSelectionChange
                                                         }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);  // Changed to string[] to match customer IDs

  // Use provided customers or get filtered customers based on section key
  const filteredCustomers =
      customers || (sectionKey ? getCustomerData(sectionKey) : []);

  // Customer count to display
  const displayCount =
      customersCount !== undefined ? customersCount : filteredCustomers.length;

  // Handle selection change from the customer table
  const handleSelectionChange = (ids: string[]) => {  // Changed to string[] to match customer IDs
    setSelectedCustomerIds(ids);
    // Also notify parent component if onSelectionChange is provided
    if (onSelectionChange) {
      onSelectionChange(ids);
    }
  };

  // Handle send email button click
  const handleSendEmail = () => {
    if (onSendEmail && selectedCustomerIds.length > 0) {
      onSendEmail(selectedCustomerIds);
    }
    if (onClose) {
      onClose(); // Close after action
    }
  };

  return (
      <>
        <div className="p-6 flex-1 overflow-y-auto">
          {children || (
              <CustomerTable
                  customers={filteredCustomers}
                  selectable={isSelectMode}
                  onSelectionChange={handleSelectionChange}
                  selectedIds={selectedCustomerIds}  // Pass the current selection to the table
              />
          )}
        </div>
        {showFooter && (
            <div className="border-gray-200 p-4 flex justify-between">
              <Button variant="neutral" onClick={onClose}>
                Cancel
              </Button>
              {isSelectMode && (
                  <Button
                      disabled={selectedCustomerIds.length === 0}
                      onClick={handleSendEmail}
                  >
                    <Mail size={16} className="mr-2" />
                    Send Email ({selectedCustomerIds.length})
                  </Button>
              )}
            </div>
        )}
      </>
  );
};

export default CustomerContent;