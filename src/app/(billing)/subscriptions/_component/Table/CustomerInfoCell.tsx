// Component to display billing address

import { useCustomerStore } from "@/app/(billing)/customers/_store/customers-store";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { Badge } from "cb-sting-react-ts";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CustomerInfoCell = ({ customer }: { customer: any }) => {
  const { siteConfig } = useSiteConfigStore();
  const { getCustomerById } = useCustomerStore();

  const [customerData, setCustomerData] = useState<any>([]);
  useEffect(() => {
    setCustomerData(getCustomerById(customer));
  }, [customer]);
  if (!customerData || customerData.length === 0) {
    return <span className="text-gray-400">{customer}-</span>;
  }
  return (
    <div className="space-y-2 text-neutral-600 font-normal">
      <div className="flex items-baseline gap-2">
        <div className="flex flex-col ">
          <Link
            href={"customers/" + customerData.id}
            className="text-neutral-600 font-semibold"
          >
            {String(customerData.customerName || "N/A")}
          </Link>
          <div className="text-gray-500 text-sm">
            {customerData.customerEmail}
          </div>
        </div>
      </div>
    </div>
  );
};
