import { TabType } from "@/app/lib/TabType";
import { Badge } from "cb-sting-react-ts";

export const autoCollectionOptions = {
  uc6_a1: (
    <div className="flex justify-between gap-x-regular">
      <div>ON </div>
      <Badge variant="primary" size="small">
        OVERRIDDEN
      </Badge>
      <div>
        <a className="text-primary-600 font-medium cursor-pointer hover:underline">
          Change
        </a>
      </div>
    </div>
  ),
  uc6_a2: (
    <div className="flex justify-between w-full  gap-x-1">
      <div>
        <div>On </div>
      </div>
      <a className="text-primary-600 font-medium cursor-pointer hover:underline">
        Change
      </a>
    </div>
  ),
  uc6_a3: (
    <div className="flex justify-between w-full  gap-x-1">
      <div>
        <div>On </div>
      </div>
      <a className="text-primary-600 font-medium cursor-pointer hover:underline">
        Change
      </a>
    </div>
  ),
  uc6_a4: (
    <div className="flex justify-between w-full  gap-x-1">
      <div>
        <div>Off </div>
      </div>
      <a className="text-primary-600 font-medium cursor-pointer hover:underline">
        Change
      </a>
    </div>
  ),
};
export const mainTabs: TabType[] = [
  {
    id: "tab1",
    title: "Summary",
  },
  {
    id: "tab2",
    title: "Custom fields",
  },
  {
    id: "tab3",
    title: "Customer configurations",
  },
  {
    id: "tab4",
    title: "Subscriptions",
  },
  {
    id: "tab5",
    title: "Account hierarchy",
  },
  {
    id: "tab6",
    title: "Billing address",
  },
  {
    id: "tab7",
    title: "Additional contacts",
  },
  {
    id: "tab8",
    title: "Payment methods",
  },
  {
    id: "tab9",
    title: "Unbilled charges",
  },
  {
    id: "tab10",
    title: "Comments",
  },
  {
    id: "tab11",
    title: "Invoice note",
  },
  {
    id: "tab12",
    title: "History",
  },
  {
    id: "tab13",
    title: "Comments",
  },
  {
    id: "tab14",
    title: "Activity Log",
  },
];
export const jumpToTabs: TabType[] = [
  {
    id: "tab1",
    title: "Summary",
  },
  {
    id: "tab2",
    title: "Subscription info",
  },
  {
    id: "tab3",
    title: "Subscription Configurations",
  },
  {
    id: "tab4",
    title: "Address",
  },
  {
    id: "tab5",
    title: "Payment Methods",
  },
  {
    id: "tab6",
    title: "Unbilled Charges",
  },
  {
    id: "tab7",
    title: "Invoice Note",
  },
  {
    id: "tab8",
    title: "Entitlements",
  },
  {
    id: "tab9",
    title: "History",
  },
  {
    id: "tab10",
    title: "Comments",
  },
  {
    id: "tab11",
    title: "Activity Log",
  },
];
export const removeTab = (tabs: TabType[], condition: boolean): TabType[] => {
  if (condition) {
    return tabs.filter((tab) => tab.id !== "tab2");
  }
  return tabs;
};
export const CustomerInfoData = [
  {
    label: "ID",
    value: "16BhkaTlflXi3QRp",
  },
  {
    label: "Company",
    value: "Zencorp",
  },
  {
    label: "First Name",
    value: "Sophia ",
  },
  {
    label: "Last Name",
    value: "Roberts",
  },
  {
    label: "Email",
    value: "billing@zencorp.com",
  },
  {
    label: "Phone Number",
    value: "(925)-285-0912",
  },
  {
    label: "JSON Metadata",
    value: (
      <a className="text-primary-600 font-medium cursor-pointer hover:underline">
        + Add
      </a>
    ),
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
