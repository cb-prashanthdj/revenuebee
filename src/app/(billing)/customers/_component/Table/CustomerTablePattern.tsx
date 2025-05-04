import React, { useState, useEffect } from "react";
import {
  Button,
  OverFlowMenu,
  Badge,
  STable as Table,
} from "cb-sting-react-ts";

import Link from "next/link";
import { BillingAddressCell } from "./BillingAddressCell";
import { PaymentMethodsCell } from "./PaymentMethodsCell";
import { NetPaymentCell } from "./NetPaymentCell";
import { CustomerStatusCell } from "./CustomerStatusCell";
import { SubscriptionInfoCell } from "./SubscriptionInfoCell";
import { CustomerInfoCell } from "./CustomerInfoCell";

interface SelectorType {
  label: string;
  action: () => void;
}

interface CustomerTablePatternProps {
  selectors?: SelectorType[];
  tabledata: any; // Prop for selectors object
  reset?: boolean; // Prop for selectors object
  filteredTableData: (data: any) => void; // Prop for selectors data filter
}

const statusVariantMapping = {
  Active: "green",
  Inactive: "red",
  Pending: "yellow",
  Suspended: "info",
  Trial: "primary",
  // Add more mappings as needed
};

const CustomerTablePatternPattern: React.FC<CustomerTablePatternProps> = ({
  selectors = {},
  tabledata,
  filteredTableData,
  reset = false,
}) => {
  const defaultSelectors: { [key: string]: () => void } = {
    "All Customers": () => {},
  };

  const [selectAll, setSelectAll] = useState(false);
  const [activeSelector, setActiveSelector] = useState("All Customers");
  const [checkedSubscriptions, setCheckedSubscriptions] = useState([]);
  const [fullData, setFullData] = useState(tabledata);

  useEffect(() => {
    if (reset) {
      setActiveSelector("All Customers");
    }
  }, [reset, tabledata]);

  // Helper function to convert camelCase to human readable text
  const camelCaseToHumanText = (text: string): string => {
    // Insert space before capital letters and uppercase the first character
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  // Header class names definition
  const headerClassNames = {
    customerInfo: "w-0 whitespace-nowrap",
    subscriptionInfo: "w-0 whitespace-nowrap font-semibold",
    paymentMethods: "w-auto",
    netPayment: "w-auto",
    channel: "w-0 whitespace-nowrap",
  };

  // Render table headers based on schema
  const renderTableHeaders = () => {
    return Object.keys(headerClassNames).map((header, index) => (
      <Table.HeaderCell
        key={index}
        className={headerClassNames[header as keyof typeof headerClassNames]}
      >
        {camelCaseToHumanText(header)}
      </Table.HeaderCell>
    ));
  };

  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    const newData = [...tabledata];
    newData[index].checkbox = !newData[index].checkbox;
    // setTabledata(newData);
  };

  // Render cell content based on column type
  const renderCellContent = (key: string, row: any) => {
    // Get the value from the row data if it exists
    const value = row[key] !== undefined ? row[key] : null;

    if (key === "customerInfo") {
      return <CustomerInfoCell customer={row} />;
    } else if (key === "billingAddress") {
      return <BillingAddressCell addresses={value || []} />;
    } else if (key === "paymentMethods") {
      return <PaymentMethodsCell paymentCards={value || []} />;
    } else if (key === "subscriptionInfo") {
      return <SubscriptionInfoCell customer={row.id} />;
    } else if (key === "customerName") {
      return (
        <Link href={"customers/" + row.id} className="text-neutral-600">
          {String(value || "N/A")}
        </Link>
      );
    } else if (key === "netPayment") {
      return (
        <NetPaymentCell
          netPayment={{
            amount: value || 0,
            currency: row.configuration?.preferredCurrency || "USD",
            unpaidAmount: 0,
          }}
        />
      );
    } else if (key === "status") {
      return <CustomerStatusCell status={value || "Unknown"} />;
    } else {
      return <div className="text-neutral-600">{value || "N/A"}</div>;
    }
  };

  // Render table rows
  const renderTableRows = () => {
    return tabledata.map((row: any, rowIndex: number) => (
      <Table.Row key={rowIndex}>
        <Table.Cell>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={() => handleCheckboxChange(rowIndex)}
          />
        </Table.Cell>
        {/* Render cells in the same order as headers */}
        {Object.keys(headerClassNames).map((key, colIndex) => (
          <Table.Cell
            key={colIndex}
            className={headerClassNames[key as keyof typeof headerClassNames]}
          >
            {renderCellContent(key, row)}
          </Table.Cell>
        ))}
      </Table.Row>
    ));
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <input type="checkbox" checked={selectAll} onChange={() => {}} />
            </Table.HeaderCell>
            {renderTableHeaders()}
          </Table.Row>
        </Table.Head>
        <Table.Body>{renderTableRows()}</Table.Body>
      </Table>
    </div>
  );
};

export default CustomerTablePatternPattern;
