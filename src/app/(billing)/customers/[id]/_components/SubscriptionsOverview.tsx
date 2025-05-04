import { Badge, Button, Card, ContainedList } from "cb-sting-react-ts";
import React, { useEffect } from "react";
import { useSubscriptionsStore } from "@/app/(billing)/subscriptions/_store/subscriptions-store";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";

const statusVariantMapping = {
  active: "green",
  cancelled: "red",
  pending: "yellow",
};

const subscriptionOverviewSchema = (overviewData) => [
  {
    label: "Subscription ID",
    value: (
      <a className="text-primary-600 font-medium cursor-pointer hover:underline">
        {overviewData.id}
      </a>
    ),
  },
  { label: "Business Entity", value: overviewData.businessEntity },
  { label: "Product Family", value: overviewData.productFamily },
  { label: "Plan", value: "" },
  {
    label: "Plan Amount",
    value: "",
  },
  { label: "Next Billing Date", value: overviewData.nextRenewal },
  { label: "Next Billing Amount", value: "" },
  { label: "Total contract value", value: overviewData.MRR },
  {
    label: "Closure of Invoice",
    value: overviewData.subscriptionConfig.autoCollection,
  },
  {
    label: "Auto Collection",
    value: overviewData.subscriptionConfig.autoCollection,
  },
];
const SubscriptionsOverview = ({ customerId }: { customerId: string }) => {
  const {
    subscriptions,
    getSubscriptionsByCustomer,
    getSubscriptionsByCustomerAndBusinessEntity,
  } = useSubscriptionsStore();
  const { siteConfig } = useSiteConfigStore();
  const [customerSubscriptions, setCustomerSubscriptions] = React.useState<any>(
    []
  );
  useEffect(() => {
    setCustomerSubscriptions(
      getSubscriptionsByCustomerAndBusinessEntity(
        customerId,
        siteConfig.activeBusinessEntity
      )
    );
  }, [customerId, siteConfig.activeBusinessEntity]);
  return (
    <div>
      <Card>
        <Card.Header
          className="uppercase"
          title="Subscriptions"
          actionElement={
            <Button size={"small"} styleType="text" className="!font-semibold">
              Edit
            </Button>
          }
        />

        {/* Customer info */}
        {customerSubscriptions.map((subscription) => (
          <div>
            <h1 className="s-h4 tracking-tight mt-1 mb-3">
              {subscription.name}{" "}
              <Badge
                className="font-normal"
                rounded="small"
                variant={
                  statusVariantMapping[subscription.status.toLowerCase()]
                }
              >
                {subscription.status}
              </Badge>
            </h1>
            <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
              <div className="w-full xl:w-1/2">
                <SubscriptionDetails
                  data={subscriptionOverviewSchema(subscription).slice(
                    0,
                    Math.ceil(
                      subscriptionOverviewSchema(subscription).length / 2
                    )
                  )}
                />
              </div>
              <div className="w-full xl:w-1/2">
                <SubscriptionDetails
                  data={subscriptionOverviewSchema(subscription).slice(
                    Math.ceil(
                      subscriptionOverviewSchema(subscription).length / 2
                    )
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};
const SubscriptionDetails = ({ data }: { data: any }) => {
  return (
    <ContainedList labels="block" padding="regular" variant="basic">
      <ContainedList.Items>
        {data.map((detail) => (
          <ContainedList.Item key={detail.label}>
            <ContainedList.Label>{detail.label}</ContainedList.Label>
            <ContainedList.Value>
              <>{detail.value}</>
            </ContainedList.Value>
          </ContainedList.Item>
        ))}
      </ContainedList.Items>
    </ContainedList>
  );
};
export default SubscriptionsOverview;
