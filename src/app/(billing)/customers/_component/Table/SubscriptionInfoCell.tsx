// Component to display complex business entity array
import { useEffect, useState } from "react";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { useSubscriptionsStore } from "@/app/(billing)/subscriptions/_store/subscriptions-store";
import { useCustomerStore } from "../../_store/customers-store";
import { Badge } from "cb-sting-react-ts";

const statusVariantMapping = {
  active: "green",
  cancelled: "red",
  pending: "yellow",
};
export const SubscriptionInfoCell = ({ customer }: { customer?: any }) => {
  const { siteConfig } = useSiteConfigStore();
  const { getCustomerById } = useCustomerStore();
  const {
    subscriptions,
    getSubscriptionsByCustomer,
    getSubscriptionsByCustomerAndBusinessEntity,
  } = useSubscriptionsStore();
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>([]);
  useEffect(() => {
    setSubscriptionInfo(
      getSubscriptionsByCustomerAndBusinessEntity(
        customer,
        siteConfig.activeBusinessEntity
      )
    );
  }, [siteConfig.activeBusinessEntity, customer]);
  if (!subscriptionInfo || subscriptionInfo.length === 0) {
    return <span className="text-gray-400">-</span>;
  }

  return (
    <div className="space-y-2 text-neutral-600 font-normal">
      {subscriptionInfo.slice(0, 1).map((subscription: any, index: number) => (
        <div className="flex items-baseline gap-2" key={index}>
          <div className="flex flex-col gap-1 w-auto">
            <Badge
              variant={statusVariantMapping[subscription.status.toLowerCase()]}
              size="small"
              className=""
            >
              {subscription.status}
            </Badge>

            {subscriptionInfo.length > 1 && (
              <div className="text-[10px] max-w-16 border p-0 rounded-full bg-neutral-100 text-center leading-tight text-primary-600">
                + {subscriptionInfo.length - 1} more
              </div>
            )}
          </div>
          <div className="flex flex-col ">
            <span className="text-gray-700 ">{subscription.name}</span>
            <div className="text-gray-500 text-sm">
              {getCustomerById(customer).configuration.preferredCurrency +
                " " +
                subscription.MRR +
                "/" +
                subscription.billingFrequency.toLowerCase()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
