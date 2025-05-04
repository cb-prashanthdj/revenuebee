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
