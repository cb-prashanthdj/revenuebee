import React from "react";
import { Button } from "cb-sting-react-ts";

// Define action groups for each tab
export const actionGroups = {
  MainActions: [
    {
      group: "Create",
      label: "Create Quote",
      action: () => console.log("Create Quote"),
    },
    {
      group: "Create",
      label: "Create Charges",
      action: () => console.log("Create Charges"),
    },
    { group: "Create", label: "Create Subscription", action: () => "hide" },
    {
      group: "Payments",
      label: "Request Payment",
      action: () => console.log("Request Payment"),
    },
    {
      group: "Payments",
      label: "Request Payment Method",
      action: () => console.log("Request Payment Method"),
    },
    {
      group: "Payments",
      label: "Record An Offline Payment",
      action: () => console.log("Record An Offline Payment"),
    },
    {
      group: "Payments",
      label: "Issue A Refund",
      action: () => console.log("Issue A Refund"),
    },
    {
      group: "More Actions",
      label: "Edit Customer Profile",
      action: () => console.log("Edit Customer"),
    },
    {
      group: "More Actions",
      label: "Edit Promotional Credits",
      action: () => console.log("Edit Promotional Credits"),
    },
    { type: "separator" },
    { label: "Delete Customer", action: () => console.log("Delete Customer") },
  ],
  CustomerFullpage: [
    // { group: '', label: 'Edit Customer Profile', action: () => console.log('Edit Customer Profile') },
    // { group: '', label: 'Add Contact', action: () => console.log('Add Contact') },
  ],
  Subscription: [
    // { label: 'Create Subscription', action: () => console.log('Create Subscription') }
  ],
  PaymentInfo: [
    // { group: '', label: 'Add Payment Method', action: () => console.log('Add Payment Method') },
    // { group: '', label: 'Request Payment', action: () => console.log('Request Payment') },
    // { group: '', label: 'Request Payment Method', action: () => console.log('Request Payment Method') },
    // { group: '', label: 'Record An Offline Payment', action: () => console.log('Record An Offline Payment') },
    // { group: '', label: 'Issue A Refund', action: () => console.log('Issue A Refund') },
  ],
  Invoices: [
    // { label: 'Invoice action', action: () => console.log('Invoice action') },
    // { label: 'Invoice action', action: () => console.log('Invoice action') }
  ],
  Quotes: [
    {
      group: "",
      label: "Quote action",
      action: () => console.log("Quote action"),
    },
    {
      group: "",
      label: "Quote action",
      action: () => console.log("Quote action"),
    },
  ],
  Credits: [
    {
      group: "",
      label: "Credit action",
      action: () => console.log("Credit action"),
    },
    {
      group: "",
      label: "Credit action",
      action: () => console.log("Credit action"),
    },
  ],
  // Additional categories can be added here as needed
};

// Define button groups for each tab
export const buttonGroups = {
  CustomerFullpage: (
    <>
      <Button variant="neutral">Secondary action</Button>
      <Button variant="primary">Primary action</Button>
    </>
  ),
  Subscription: <Button variant="primary">Create Subscription</Button>,
  PaymentInfo: (
    <>
      <Button variant="neutral">Request Payment</Button>
      <Button variant="primary">Add Payment Method</Button>
    </>
  ),
  Invoices: <Button variant="primary">Create Invoice</Button>,
  Quotes: <Button variant="primary">Create Quote</Button>,
  Credits: <Button variant="primary">Create Credit</Button>,
  // Additional categories can be added here as needed
};
