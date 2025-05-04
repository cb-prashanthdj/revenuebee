import React, { useState } from "react";
import {
  ContainedList,
  ContainedListItem,
  ContainedHeader,
  ContainedListItems,
  ContainedTitle,
  ContainedListValue,
} from "cb-sting-react-ts";
import { useSearchParams } from "next/navigation";
// import { CreateQuoteModal } from "../../_components/CreateQuoteModal";

type Props = {
  currentTab: string;
  onClickAction: (action: string) => void;
};

const Actions = ({ currentTab, onClickAction }: Props) => {
  const searchParams = useSearchParams();
  const [quoteStatus, setQuoteStatus] = useState(searchParams.get("status"));
  const handleCreateQuote = () => {
    setQuoteStatus("CREATE_NEW_QUOTE");
  };
  const MainActions = [
    {
      label: "Customer",
      value: "Edit Customer",
      action: () => console.log("Edit Customer"),
    },
    {
      label: "Subscription",
      value: "Create New Subscription",
      action: () => console.log("Create New Subscription Method"),
    },
    {
      label: "Subscription",
      value: "Create Quote",
      action: handleCreateQuote,
    },
    {
      label: "Billing",
      value: "Request Payment Method Update",
      action: () => console.log("Request Payment Method Update"),
    },
    {
      label: "Billing",
      value: "Add One-Time Charges and Quick Charges",
      action: () => console.log("Add One-Time Charges and Quick Charges"),
    },
    {
      label: "Billing",
      value: "Add Charge",
      action: () => console.log("Add Charge"),
    },
    {
      label: "Billing",
      value: "Create Quick Charge",
      action: () => console.log("Create Quick Charge"),
    },
    {
      label: "Billing",
      value: "Manage Credits",
      action: () => console.log("Manage Credits"),
    },
    {
      label: "Billing",
      value: "Record an Offline Payment",
      action: () => console.log("Record an Offline Payment"),
    },
  ];

  const customerActions = MainActions.filter(
    (item) => item.label === "Customer"
  );
  const subscriptionActions = MainActions.filter(
    (item) => item.label === "Subscription"
  );
  const billingActions = MainActions.filter((item) => item.label === "Billing");

  return (
    <div>
      <div className="flex flex-col">
        <div className="space-y-4">
          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Customer Actions</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              {customerActions.map((item, index) => (
                <ContainedListItem key={index}>
                  <ContainedListValue>{item.value}</ContainedListValue>
                </ContainedListItem>
              ))}
            </ContainedListItems>
          </ContainedList>

          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Subscription Actions</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              {subscriptionActions.map((item, index) => (
                <ContainedListItem key={index} onClick={handleCreateQuote}>
                  <ContainedListValue>{item.value}</ContainedListValue>
                </ContainedListItem>
              ))}
            </ContainedListItems>
          </ContainedList>
          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Billing Actions</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              {billingActions.map((item, index) => (
                <ContainedListItem key={index}>
                  <ContainedListValue>{item.value}</ContainedListValue>
                </ContainedListItem>
              ))}
            </ContainedListItems>
          </ContainedList>

          <div className="border-b border-neutral-100 my-2"></div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
            className={`block w-full text-left py-1.5 cursor-pointer leading-4 text-red-500 hover:text-red-600`}
          >
            Delete Customer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Actions;
