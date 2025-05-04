"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  Button,
  Card,
  SHeader,
  SelectItem,
  SelectMenu,
} from "cb-sting-react-ts";
import { MetricsAnalytics } from "./MetricsAnalytics";

import { LinkedPricingTable } from "./LinkedPricingTable";
import { MetricsNotification } from "./MetricsNotification";
import { MetricsNotificationSuccessPricing } from "./MetricsNotificationSuccessPricing";
import { UsageConfiguration } from "./UsageConfiguration";
import { UsageSummary } from "./UsageSummary";

const statsData = [
  {
    title: "Total usage",
    value: "521,212",
    unit: "conversations",
    change: "25.3%",
    changeType: "positive",
  },
  {
    title: "Used versus Allocated usage",
    value: "521,212 / 684,600",
    unit: "conversations",
  },
  {
    title: "Customers",
    value: "3,250",
    unit: "",
    change: "11.8%",
    changeType: "positive",
  },
  {
    title: "Subscriptions",
    value: "3,423",
    unit: "",
    change: "13.2%",
    changeType: "positive",
  },
];

type Props = {
  columns: boolean;
  onClickView: (view) => void;
  status?: string;
};
export const MetricsDetailsFullpage = ({
  columns,
  onClickView,
  status = "active",
}: Props) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const onDurationChange = (val) => {
    setIsDataLoading(true);
    setTimeout(() => {
      setIsDataLoading(false);
    }, 2000);
  };
  return (
    <>
      <div className="space-y-xxlarge pb-16">
        {status == "new" ? (
          <MetricsNotification />
        ) : status == "success-pricing" ? (
          <MetricsNotificationSuccessPricing />
        ) : (
          // <MetricsInsights />
          <></>
        )}
        {status != "new" && status != "success-pricing" && (
          <>
            {/* summary */}
            {status != "success-pricing" && (
              <section
                id="section1"
                className="col-span-12 space-y-4 scroll-mt-20"
              >
                <Card padding="none" background="transparent" depth="flat">
                  <SHeader
                    type="card"
                    title="Usage Summary"
                    actionElements={
                      <SelectMenu
                        label="hidden"
                        labelText="Previous month"
                        placeholder="Previous month"
                        size="regular"
                        onValueChange={(value: string) => {
                          onDurationChange(value);
                        }}
                      >
                        <SelectItem value="val1"> Previous month </SelectItem>
                      </SelectMenu>
                    }
                  />
                  <UsageSummary statsData={statsData} />
                </Card>
              </section>
            )}
            {/* Metrics Analytics */}
            <div id="section2" className="col-span-12 space-y-4 scroll-mt-20">
              <Card background="transparent" padding="none" depth="flat">
                <SHeader
                  type="card"
                  title="Usage trend"
                  actionElements={
                    <SelectMenu
                      label="inline"
                      labelText="View by: "
                      placeholder=""
                      size="regular"
                      value="val1"
                      onValueChange={(value: string) => {
                        onDurationChange(value);
                      }}
                    >
                      <SelectItem value="val1"> Last 1 month </SelectItem>
                      <SelectItem value="val2"> Last 2 month </SelectItem>
                      <SelectItem value="val3"> Last 3 month </SelectItem>
                    </SelectMenu>
                  }
                />
                <MetricsAnalytics isLoading={isDataLoading} />
              </Card>
            </div>
            {/* Revenue for Compute Units */}
            {/* <div id="section3" className="col-span-12 space-y-4 scroll-mt-20">
              <Card background="transparent" padding="none" depth="flat">
                <SHeader
                  type="card"
                  title="Revenue trend"
                  actionElements={
                    <SelectMenu
                      label="inline"
                      labelText="View by: "
                      placeholder=""
                      size="regular"
                      value="val1"
                      onValueChange={(value: string) => {
                        onDurationChange(value);
                      }}
                    >
                      <SelectItem value="val1"> Last 1 month </SelectItem>
                      <SelectItem value="val2"> Last 2 month </SelectItem>
                      <SelectItem value="val3"> Last 3 month </SelectItem>
                    </SelectMenu>
                  }
                />
                <RevenueComputeUnits />
              </Card>
            </div> */}
            {/* Associated Item */}
            <div id="section4" className="col-span-12 space-y-4 scroll-mt-20">
              <Card background="transparent" padding="none" depth="flat">
                <SHeader
                  type="card"
                  title="Prices linked to this metered feature"
                  actionElements={
                    <>
                      <SelectMenu
                        label="inline"
                        labelText="View: "
                        placeholder=""
                        size="regular"
                        value="val1"
                        onValueChange={(value: string) => {
                          onDurationChange(value);
                        }}
                      >
                        <SelectItem value="val1">Included usage </SelectItem>
                      </SelectMenu>
                      <div className="w-1/4">
                        <Button size="regular" styleType={"outline"}>
                          {" "}
                          <PlusIcon className="size-4" />
                          Link pricing
                        </Button>
                      </div>
                    </>
                  }
                />
                <LinkedPricingTable />
              </Card>
            </div>
          </>
        )}
        {/* Prices linked to this metered feature */}
        {status == "success-pricing" && (
          <div id="section4" className="col-span-12 space-y-4 scroll-mt-20">
            <Card background="transparent" padding="none" depth="flat">
              <SHeader
                type="card"
                title="Prices linked to this metered feature"
                actionElements={
                  <>
                    <SelectMenu
                      label="inline"
                      labelText="View: "
                      placeholder=""
                      size="regular"
                      value="val1"
                      onValueChange={(value: string) => {
                        onDurationChange(value);
                      }}
                    >
                      <SelectItem value="val1">Included usage </SelectItem>
                    </SelectMenu>
                    <div className="w-1/4">
                      <Button size="regular" styleType={"outline"}>
                        {" "}
                        <PlusIcon className="size-4" />
                        Link pricing
                      </Button>
                    </div>
                  </>
                }
              />
              <LinkedPricingTable />
            </Card>
          </div>
        )}
        {/* UsageConfiguration Item */}
        <div className="col-span-12 space-y-4">
          <Card padding="none" background="transparent" depth="flat">
            <SHeader type="card" title="Configuration" />
            <UsageConfiguration status={status} />
          </Card>
        </div>

        {/* Blank section */}
        {/* <div className="col-span-12 space-y-4">
                <Card>
                    <Card.Header title="Blank section"></Card.Header>
                    
                </Card>
            </div> */}
      </div>
    </>
  );
};
