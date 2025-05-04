import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Notification } from "cb-sting-react-ts";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { Check } from "lucide-react";

interface RowItem {
  id: string;
  name: string;
  description: string;
  isTestSite?: boolean;
}

const SelectableRowList: React.FC = () => {
  const defaultItems: RowItem[] = [
    {
      id: "1",
      name: "Import Subscriptions for Items",
      description:
        "Creates new Subscriptions for existing Customers using item model without generating invoices. You can include Subscription status (trial, active, etc.), subscription_items, current term end, , and a Coupon along with the Customer for whom the Subscription is being created.",
    },
    {
      id: "2",
      name: "Create Coupons",
      description: "Creates multiple Coupons at once.",
    },
    {
      id: "3",
      name: "Create Item Families",
      description: "Creates multiple Item Families at once.",
      isTestSite: true,
    },
    {
      id: "4",
      name: "Create Items",
      description: "Creates multiple Items at once.",
    },
    {
      id: "5",
      name: "Create Item Prices",
      description: "Creates multiple Item prices at once.",
    },
    {
      id: "6",
      name: "Import Taxes",
      description:
        "Configure tax rates and effective time periods for regions where you operate. Importing can overwrite all your taxes if the overwrite flag in the file is set to ‘true’. To edit tax rates for a region, re-import the entire file with all the tax rates for this region, even the ones you are not changing.",
    },
  ];

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { isTestSite } = useSiteConfigStore();

  const handleRowClick = (id: string) => {
    const newSelectedId = selectedItemId === id ? null : id;
    setSelectedItemId(newSelectedId);
  };

  return (
    <div className="w-full mx-auto rounded-lg">
      {defaultItems.map((item) => {
        const isSelected = item.id === selectedItemId;

        return (
          <div
            key={item.id}
            className={`border-t border-b border-gray-300 relative ${
              isSelected ? "bg-green-50" : ""
            }`}
          >
            <div
              className={`flex items-start p-4 cursor-pointer ${
                isSelected ? "bg-green-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleRowClick(item.id)}
            >
              <div className="mr-4">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && <Check size={16} color="white" />}
                </div>
              </div>

              <div className="flex w-full items-start gap-4 pt-1">
                <h3 className="text-lg font-medium text-gray-900 min-w-[300px] leading-tight">
                  {item.name}
                </h3>
                <div className="flex flex-col w-full gap-2">
                  <p className="flex-1 text-lg text-gray-600 leading-tight">
                    {item.description}
                  </p>
                  {item.isTestSite && isTestSite && (
                    <Notification
                      icon
                      size="regular"
                      variant="yellow"
                      width="full"
                      iconContent={<InformationCircleIcon />}
                    >
                      <span className="s-notification-copy">
                        Your maximum limit on xyz has been reached. To increase
                        limit, please contact support. Request an Upgrade
                      </span>
                    </Notification>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="absolute right-4 mb-4 flex items-start">
                  <button
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Proceed
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectableRowList;
