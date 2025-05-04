// Component to display complex business entity array

import Link from "next/link";
import { useCustomerStore } from "../../../customers/_store/customers-store";
import { Badge } from "cb-sting-react-ts";

const statusVariantMapping = {
  active: "green",
  cancelled: "red",
  pending: "yellow",
};
export const SubscriptionInfoCell = ({
  subscription,
}: {
  subscription?: any;
}) => {
  const { getCustomerById } = useCustomerStore();

  return (
    <div className="space-y-2 text-neutral-600 font-normal">
      <div className="flex items-baseline gap-2">
        <div className="flex flex-col gap-1 w-1/3">
          <Badge
            variant={statusVariantMapping[subscription.status.toLowerCase()]}
            size=""
            className="text-sm"
          >
            {subscription.status}
          </Badge>
        </div>
        <div className="flex flex-col w-2/3">
          <span className="text-gray-700 ">
            <Link
              href={"subscriptions/" + subscription.id}
              className="text-neutral-600 font-semibold"
            >
              {String(subscription.name || "N/A")}
            </Link>
          </span>
          <div className="text-gray-500 text-sm">{subscription.id}</div>
        </div>
      </div>
    </div>
  );
};
