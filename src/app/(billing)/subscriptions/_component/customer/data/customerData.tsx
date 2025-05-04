// itemsData.ts
// import { SegmentType } from '../details/Quotes';
import { Button, Toggle } from "cb-sting-react-ts";
import { InvoiceType, PaytmentType } from "../model/InvoiceType"; // Import the type from ItemType.ts
import { TabType } from "@/app/lib/TabType";

export const InvoiceItems: InvoiceType[] =
  // ... your array of objects
  // Example:
  [
    {
      id: "IN142",
      status: "Paid",
      createdOn: "2023-11-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN141",
      status: "Paid",
      createdOn: "2023-10-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN140",
      status: "Paid",
      createdOn: "2023-09-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN141",
      status: "Paid",
      createdOn: "2023-08-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN140",
      status: "Paid",
      createdOn: "2023-07-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN141",
      status: "Paid",
      createdOn: "2023-06-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN140",
      status: "Paid",
      createdOn: "2023-05-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN141",
      status: "Paid",
      createdOn: "2023-04-29T11:55:00Z",
      Total: "$3,000 USD",
    },
    {
      id: "IN140",
      status: "Paid",
      createdOn: "2023-03-29T11:55:00Z",
      Total: "$3,000 USD",
    },
  ];

export const originalArray = [
  {
    id: "customer_001",
    status: "Active",
    family: "Enterprise",
    plan: "Pro Plan",
    planAmount: "$500",
    MRR: "$500",
    nextBillingInfo: "2024-01-15",
    Coupons: "30% off for one time",
  },
  {
    id: "customer_002",
    status: "Active",
    family: "Small Business",
    plan: "Basic Plan",
    planAmount: "$200",
    MRR: "$200",
    nextBillingInfo: "2024-02-10",
    Coupons: "Launch Offer 20%",
  },
  {
    id: "customer_003",
    status: "Pending",
    family: "Startups",
    plan: "Starter Plan",
    planAmount: "$100",
    MRR: "$0",
    nextBillingInfo: "None",
    Coupons: "30% off for one time",
  },
  {
    id: "customer_004",
    status: "Suspended",
    family: "Mid-Market",
    plan: "Growth Plan",
    planAmount: "$300",
    MRR: "$300",
    nextBillingInfo: "2024-03-22",
    Coupons: "30% off for one time",
  },
  {
    id: "customer_005",
    status: "Cancelled",
    family: "Enterprise",
    plan: "Premium Plan",
    planAmount: "$800",
    MRR: "$800",
    nextBillingInfo: "2024-04-05",
    Coupons: "30% off for one time",
  },
];

export const paymentInfoArray = [
  {
    id: "pm_6oadMTwtyNrM15uk",
    referenceId: "tok_6oadMTwtyNqx15uj",
    expiryDate: "Dec 2024",
    name: "Harish Vaidyanathan",
    billingAddress: "1945 Berkeley Way, Apt 319 Berkeley 94704 United States",
  },
  {
    id: "lt_6oadMTwtyNrM15uk",
    referenceId: "sub_6oadMTwtyNqx15ujs",
    expiryDate: "Mar 2028",
    name: "Jayaraj Elaraj",
    billingAddress: "1 Fairfield Way, Apt 19 Connecticut 84904 United States",
  },
];

export const paymentInfo = [
  {
    label: "ID",
    value: "pm_6oadMTwtyNrM15uk",
  },
  {
    label: "Reference ID",
    value: "tok_6oadMTwtyNqx15uj",
  },
  {
    label: "Expiry Date",
    value: "Dec 2024",
  },
  {
    label: "Name",
    value: "Harish Vaidyanathan",
  },
  {
    label: "Billing Address",
    value: "1945 Berkeley Way, Apt 319 Berkeley 94704 United States",
  },
];

export const mainTabs: TabType[] = [
  {
    id: "tab1",
    title: "Customer Fullpage",
  },
  {
    id: "tab2",
    title: `Subscriptions`,
  },
  {
    id: "tab3",
    title: "Invoices",
  },
  {
    id: "tab5",
    title: "Credits",
  },
  {
    id: "tab6",
    title: "Quotes",
  },
  // {
  //   id: "tab7",
  //   title: "Payment Info",
  // },
  // {
  //   id: "tab8",
  //   title: "History",
  // },
  // {
  //   id: "tab9",
  //   title: "Comments",
  // },
  // {
  //   id: "tab10",
  //   title: "Activity Log",
  // },
];

export const jumpToTabs: TabType[] = [
  {
    id: "tab1",
    title: "Summary",
    sectionId: "section1",
  },
  {
    id: "tab2",
    title: `Custom Fields`,
    sectionId: "section2",
  },
  {
    id: "tab3",
    title: "Customer Configration",
    sectionId: "section3",
  },
  {
    id: "tab5",
    title: "Subscriptions",
    sectionId: "section5",
  },
  {
    id: "tab6",
    title: "Account hierarchy",
    sectionId: "section6",
  },
  {
    id: "tab7",
    title: "Billing Address",
    sectionId: "section7",
  },
  {
    id: "tab8",
    title: "Additional Contacts",
    sectionId: "section8",
  },
  {
    id: "tab9",
    title: "Payments Methods",
    sectionId: "section9",
  },
  {
    id: "tab10",
    title: "Unbilled Charges",
    sectionId: "section10",
  },
  {
    id: "tab11",
    title: "Invoice Note",
    sectionId: "section11",
  },
  {
    id: "tab12",
    title: "History",
    sectionId: "section12",
  },
  {
    id: "tab13",
    title: "Comments",
    sectionId: "section13",
  },

  {
    id: "tab14",
    title: "Activity Log",
    sectionId: "section14",
  },
];

// Function to remove tab with id "tab2" based on a condition
export const removeTab = (tabs: TabType[], condition: boolean): TabType[] => {
  if (condition) {
    return tabs.filter((tab) => tab.id !== "tab2");
  }
  return tabs;
};

export const historyChildTabs: TabType[] = [
  {
    id: "tabInner1",
    title: "Invoices",
  },
  {
    id: "tabInner2",
    title: "Transactions",
  },
  {
    id: "tabInner3",
    title: "Credit Notes",
  },
  {
    id: "tabInner4",
    title: "Promotional Credits",
  },
];

export const CustomerConfigData = [
  {
    label: "Language",
    value: "English",
  },
  {
    label: "Preferred Currency",
    value: "USD",
  },
  {
    label: "Direct Debit",
    value: "Enabled",
  },
  {
    label: "Auto Collection",
    value: (
      // <Toggle size="small">
      //   <p>Hello</p>
      // </Toggle>
      <div className="flex justify-between gap-x-regular">
        <div>ON </div>
        <div>
          <a className="text-primary-600 font-medium cursor-pointer hover:underline">
            Change
          </a>
        </div>
      </div>
    ),
  },
  {
    label: "Payment terms",
    value:
      "Due Upon Receipt. Applies only when customer's auto-collection is off. All invoices will be generated as Posted.",
  },
  {
    label: "Next billing date",
    value: "Nov 30 2023 11:51",
  },
  {
    label: "Next billing amount",
    value: (
      <div>
        <span className="pr-2">$110.00</span>
        <a className="text-primary-600 font-medium cursor-pointer hover:underline">
          View invoice
        </a>
      </div>
    ),
  },
  {
    label: "Consolidated Invoicing",
    value:
      "Use Site Default. A separate invoice will be generated for every subscription charge of this customer.",
  },
  {
    label: "Closure of Invoice",
    value: "Manual",
  },
];
