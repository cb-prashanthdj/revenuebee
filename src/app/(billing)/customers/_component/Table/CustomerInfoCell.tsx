// Component to display billing address

import { Badge } from "cb-sting-react-ts";
import Link from "next/link";

const statusVariantMapping = {
  Active: "green",
  Cancelled: "red",
  Pending: "yellow",
};
export const CustomerInfoCell = ({ customer }: { customer: any }) => {
  return (
    <div className="space-y-2 text-neutral-600 font-normal">
      <div className="flex items-baseline gap-2">
        <div className="flex flex-col ">
          <Link
            href={"customers/" + customer.id}
            className="text-neutral-600 font-semibold"
          >
            {String(customer.customerName || "N/A")}
          </Link>
          {/* <span className="text-gray-700 ">{customer.customerName}</span> */}
          <div className="text-gray-500 text-sm">{customer.customerEmail}</div>
        </div>
      </div>
    </div>
  );
};
