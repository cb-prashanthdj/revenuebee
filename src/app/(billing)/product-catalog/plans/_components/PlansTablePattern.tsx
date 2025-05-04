import React, { useState, useEffect } from "react";
import { Button, OverFlowMenu, Badge } from "cb-sting-react-ts";
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
} from "@/app/(billing)/subscriptions/_component/Table";
import {
  EnvelopeIcon,
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { camelCaseToHumanText } from "@/app/lib/utils";

interface SelectorType {
  label: string;
  action: () => void;
}

interface PlansTablePatternProps {
  // selectors?: { [key: string]: () => void }; // Prop for selectors object
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

const PlansTablePattern: React.FC<PlansTablePatternProps> = ({
  selectors = {},
  tabledata,
  filteredTableData,
  reset = false,
}) => {
  const defaultSelectors: { [key: string]: () => void } = {
    "All Subscriptions": () => {
      // Function logic for "All Subscriptions" selector
      // Example: SubscriptionsData();
    },
  };

  const [selectAll, setSelectAll] = useState(false);
  const [activeSelector, setActiveSelector] = useState("All Subscriptions");
  const [checkedSubscriptions, setCheckedSubscriptions] = useState([]);
  const [fullData, setFullData] = useState(tabledata);

  useEffect(() => {
    if (reset) {
      setActiveSelector("All Subscriptions");
    }
  }, [reset, tabledata]);

  const toggleAllCheckboxes = () => {
    // @ts-ignore
    const allSubscriptionIds = tabledata.map((row) => row.id);
    if (checkedSubscriptions.length === allSubscriptionIds.length) {
      // If all checkboxes are currently checked, uncheck all
      setCheckedSubscriptions([]);
      setSelectAll(false);
    } else {
      // If not all are checked, check all
      setCheckedSubscriptions(allSubscriptionIds);
      setSelectAll(true);
    }
  };
  // @ts-ignore
  const toggleSingleCheckbox = (rowId) => {
    let updatedCheckedSubscriptions = [...checkedSubscriptions];
    // @ts-ignore

    if (updatedCheckedSubscriptions.includes(rowId)) {
      // If the rowId exists in checkedSubscriptions, remove it
      updatedCheckedSubscriptions = updatedCheckedSubscriptions.filter(
        (id) => id !== rowId
      );
    } else {
      // If the rowId doesn't exist in checkedSubscriptions, add it
      // @ts-ignore

      updatedCheckedSubscriptions.push(rowId);
    }
    setCheckedSubscriptions(updatedCheckedSubscriptions);

    // Update selectAll checkbox state based on the number of checked items
    setSelectAll(updatedCheckedSubscriptions.length === tabledata.length);
  };

  const handleSelectorClick = (selectorName: string, value: boolean) => {
    setActiveSelector(selectorName);
    if (!selectors[selectorName]) {
      // Perform any other logic when a selector is clicked and is now active
    } else if (!value) {
      console.log(`${selectors[selectorName]} is now active`);
      selectors[selectorName].length === 0
        ? filteredTableData([{}])
        : filteredTableData(selectors[selectorName]);
    }
  };

  // const handleSelectorClick = (selector: SelectorType) => {
  //   setActiveSelector(selector.label);
  //   selector.action();
  // };

  // todo make these in resuable table classes
  const headerClassNames = {
    // checkbox: "w-0 whitespace-nowrap",
    id: "w-0 whitespace-nowrap",
    plan: "w-0 whitespace-nowrap",
    status: "w-0",
    statusValue: "hidden",
    productFamily: "w-0 whitespace-nowrap text-right",
    displayInCheckout: "w-0",
    displayInSelfServe: "w-0",
    createdOn: "w-0 whitespace-nowrap",
  };

  const cellClassNames = {
    // checkbox: "w-0 whitespace-nowrap",
    id: "w-0 whitespace-nowrap",
    plan: "w-0 whitespace-nowrap",
    status: "w-0",
    statusValue: "hidden",
    productFamily: "w-0 whitespace-nowrap text-right",
    displayInCheckout: "w-0",
    displayInSelfServe: "w-0",
    createdOn: "w-0 whitespace-nowrap text-lightest",
  };

  const quickActions = [
    {
      action: "#", // Replace '#' with the appropriate action for 'Edit Customer'
      label: "Edit Customer",
      value: "EditCustomer",
    },
    {
      action: () => {}, // Define the action function for 'Create New Subscription'
      label: "Create New Subscription",
      value: "CreateNewSubscription",
    },
    {
      label: "Request Payment Method", // 'Request Payment Method' without any action
      value: "RequestPaymentMethod",
    },
    {
      label: "Add Credit Card", // 'Add Credit Card' without any action
      value: "AddCreditCard",
    },
    {
      label: "Add Billing Info", // 'Add Billing Info' without any action
      value: "AddBillingInfo",
    },
    {
      label: "Change Auto Collection", // 'Change Auto Collection' without any action
      value: "ChangeAutoCollection",
    },
    {
      label: "Delete Customer", // 'Delete Customer' without any action
      value: "DeleteCustomer",
      customclass: "alert", // Adding custom class 'alert' to 'Delete Customer' item
    },
  ];

  const customerActions = [
    {
      label: "Associated Subscriptions",
      value: "AssociatedSubscriptions",
    },
    {
      label: "Associated Invoices",
      value: "AssociatedInvoices",
    },
    {
      label: "Associated Transactions",
      value: "AssociatedTransactions",
    },
    {
      label: "Associated Orders",
      value: "AssociatedOrders",
    },
  ];

  const renderTableHeaders = () => {
    // console.log("tabledata", tabledata);
    if (tabledata && tabledata.length > 0) {
      return Object.keys(tabledata[0]).map((header, index) => {
        const headerKey = header as keyof typeof headerClassNames;
        const isValidHeader = headerKey in headerClassNames;
        // console.log("header ", header);
        if (isValidHeader) {
          return (
            <TableHeaderCell
              key={index}
              customClass={headerClassNames[headerKey]}
            >
              {camelCaseToHumanText(headerKey)}
            </TableHeaderCell>
          );
        }
        return null;
      });
    }
  };

  // @ts-ignore
  const customCellRender = (key, cell, row) => {
    if (key === "plan") {
      return (
        <Link
          href={"details/"}
          className=""
          // onClick={(e) => {
          //   e.preventDefault();
          //   // handleCustomerNameClick(row);
          // }}
        >
          {String(cell)}
        </Link>
      );
    }
    return cell;
  };

  const selectorsToRender =
    Object.keys(selectors).length > 0 ? selectors : defaultSelectors;
  const maxVisibleSelectors = 7; // Maximum number of selectors to display

  const [showAllSelectors, setShowAllSelectors] = useState(false);

  const visibleSelectors = Object.keys(selectorsToRender).slice(
    0,
    maxVisibleSelectors
  );
  const hiddenSelectors =
    Object.keys(selectorsToRender).slice(maxVisibleSelectors);

  const toggleShowAll = () => {
    setShowAllSelectors(!showAllSelectors); // Toggle showAllSelectors state
  };

  const renderSelector = () => {
    // const selectorsToRender = Object.keys(selectors).length > 0 ? selectors : defaultSelectors;

    return (
      <div className="group-selectors hidden">
        {/* Show max 7 selectors at once and hide the rest */}
        {/* {[
          ...visibleSelectors,
          ...(showAllSelectors ? hiddenSelectors : []),
        ].map((selectorName, index) => (
          // @ts-ignore
          <Selector
            key={index}
            onActionClick={(value) => handleSelectorClick(selectorName, value)}
            onActionIconClick={() => console.log("action")}
            onClick={() => console.log(selectorsToRender[selectorName])}
            quantityValue={selectorsToRender[selectorName].length}
            quantityWithAction
            selectorValue={activeSelector === selectorName}
            variant="default"
            disabled={(selectors[selectorName] || []).length === 0}
            size="small"
          >
            {selectorName}
          </Selector>
        ))} */}

        {/* Toggle button to show less or show all selectors */}
        {Object.keys(selectorsToRender).length > maxVisibleSelectors && (
          <Button
            onClick={toggleShowAll}
            size="small"
            styleType="text"
            variant="neutral"
          >
            {showAllSelectors ? "Show Less Segments" : "Show All Segments"}
          </Button>
        )}

        <Button
          // onClick={toggleShowAll}
          size="small"
          styleType="text"
          variant="neutral"
        >
          <PlusIcon />
          New
        </Button>

        <Button
          // onClick={toggleShowAll}
          size="small"
          styleType="text"
          variant="neutral"
        >
          <PencilIcon />
          Manage
        </Button>
      </div>
    );
  };

  const renderTableRows = () => {
    if (tabledata && tabledata.length > 0) {
      return (
        // @ts-ignore
        tabledata.map((row: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {
              <td className="w-0">
                {/* feature make this checkbox work too and link to master checkbox */}
                <input
                  type="checkbox"
                  // @ts-ignore

                  checked={checkedSubscriptions.includes(row.id)}
                  onChange={() => toggleSingleCheckbox(row.id)}
                />
              </td>
            }
            {Object.entries(row).map(
              ([key, cell]: [string, any], cellIndex: number) => {
                let content;

                if (key === "status") {
                  const variant = statusVariantMapping[cell] || "default";
                  content = <Badge variant={variant}>{String(cell)}</Badge>;
                } else if (React.isValidElement(cell)) {
                  content = cell;
                } else {
                  content = customCellRender
                    ? customCellRender(key, cell, row)
                    : String(cell);
                }

                // console.log("content", key);
                return (
                  <td key={cellIndex} className={cellClassNames[key]}>
                    {/* {customCellRender // Check if custom render function is provided
                    ? customCellRender(key, cell, row)
                    : React.isValidElement(cell)
                    ? cell
                    : String(cell)} */}
                    {content}
                  </td>
                );
              }
              // @ts-ignore
            )}
            {/* {withActions && ( */}
            <td className="item-actions pl-8">
              {/* @ts-ignore  */}

              <OverFlowMenu
                launchIcon={<EllipsisVerticalIcon />}
                menuGroups={[
                  {
                    items: quickActions,
                    title: "Customer Quick Actions",
                  },
                  {
                    items: customerActions,
                    title: "Customer References",
                  },
                ]}
                position="left"
                variant="om-multiple"
              />
            </td>
            {/* // )} */}
          </tr>
        ))
      );
    }
  };

  return (
    <div className="customersTable space-y-4">
      <div className="space-y-1">{renderSelector()}</div>

      <div className="space-y-0">
        <div className="table-actions">
          <div className="">
            <label className="flex items-center gap-2 cursor-pointer">
              {/* feature make this checkbox a master checkbox which selects all check boxes and if not are selected deselect this */}
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleAllCheckboxes}
              />
              Select All Plans
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              variant="neutral"
              styleType="text"
              size="small"

              // label={`Email to ${checkedSubscriptions.length === 0 ? 'All' : checkedSubscriptions.length} Customers`}
              // onClick={() => setShowSendEmailsModal(true)}
            >
              <EnvelopeIcon /> Email to{" "}
              {checkedSubscriptions.length === 0
                ? "All"
                : checkedSubscriptions.length}{" "}
              Plans
            </Button>
            <Button
              variant="neutral"
              styleType="text"
              size="small"

              // label={`Download ${checkedSubscriptions.length === 0 ? 'All' : checkedSubscriptions.length} Subscriptions Data`}
            >
              <ArrowDownTrayIcon /> Download{" "}
              {checkedSubscriptions.length === 0
                ? "All"
                : checkedSubscriptions.length}{" "}
              Plans Data
            </Button>
          </div>
        </div>

        <TableRoot>
          <TableHeader>
            <TableRow>
              <th className="w-0"></th>
              {renderTableHeaders()}
              {tabledata.length > 0 ? (
                <th className="w-0 text-right">Actions</th>
              ) : (
                <th className="w-0" colSpan={7}>
                  No Data
                </th>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableRows()}</TableBody>
        </TableRoot>
      </div>
    </div>
  );
};

export default PlansTablePattern;
