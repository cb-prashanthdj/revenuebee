"use client";

import { CreateLayout } from "@/components/templates/CreateLayout";
import {
  Button,
  Tabs,
  TabsList,
  CreateHeader,
  TabsContent,
  Card,
  Badge,
  Tooltip,
  OverFlowMenu,
} from "cb-sting-react-ts";
import React, { ReactNode } from "react";
import SitesDetailsTable from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/SitesDetailsTable";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { CardHeader } from "@/app/(billing)/subscriptions/_component/Header";

const apiData = [
  {
    header: "Barametrics",
    subText: "whv2_16Bkx7Tku47qn3E",
    link: "https://webhook.site/dca4de45-61c8-49c0-8736-5a69a5861ce7",
  },
  {
    header: "Gmail",
    subText: "whv2_16Bkx7Tku47qn3E",
    link: "https://webhook.site/dca4de45-61c8-49c0-8736-5a69a5861ce7",
  },
  {
    header: "Webhooks for events",
    subText: "whv2_16Bkx7Tku47qn3E",
    link: "https://webhook.site/dca4de45-61c8-49c0-8736-5a69a5861ce7",
  },
];

const ApiPage = () => {
  const [eventsState, setEventsState] = React.useState<boolean>(true);
  return (
    <CreateLayout>
      <CreateHeader
        // backAction={
        //   <Link href={"#"}>
        //     <Button size="small" styleType="text" variant="neutral">
        //       <ArrowLeftIcon /> Back
        //     </Button>
        //   </Link>
        // }
        title="Configure Chargebee"
        subtitle={"API Keys and Webhooks"}
      />

      <CreateLayout.Grid gridColumns={11} className="min-h-screen px-6 mt-6">
        <CreateLayout.Content span={8}>
          <Tabs defaultTabID="tab2" onValueChange={() => {}} tabId="tab1">
            <TabsList
              size="regular"
              tabStyle="lined"
              tabs={[
                {
                  id: "tab1",
                  title: "API Keys (4)",
                },
                {
                  id: "tab2",
                  title: "Webhooks (2)",
                },
              ]}
              variant="horizontal"
              width="inline"
            />

            <TabsContent onValueChange={() => {}} tabId="tab2">
              <div
                className={"flex justify-center items-center space-x-6 py-4"}
              >
                <p>
                  Webhooks notify your application about events that occur in
                  Chargebee. If we do not receive a 2XX response code, we will
                  retry calling your webhook with exponential time intervals
                  over the next 3 days.
                  <span>
                    <Link
                      className={"text-blue-600 flex gap-2 items-center"}
                      href={"#"}
                    >
                      {" "}
                      <span>
                        <SquareArrowOutUpRight size={15} />{" "}
                      </span>
                      Learn more
                    </Link>
                  </span>
                  .
                </p>
                <Tooltip
                  color="dark"
                  label="You've reached the maximum limit of 2,500 records for this test site."
                  placement="bottom"
                  width="Regular"
                >
                  <Button
                    size="regular"
                    styleType="text"
                    variant="primary"
                    disabled={true}
                  >
                    Add Webhook
                  </Button>
                </Tooltip>
              </div>
              <div className={"space-y-4"}>
                {apiData.map((item, index) => (
                  <Card key={index} spacey="null">
                    <Card.Header
                      title={item.header}
                      actionElement={
                        <div className="s-gap-regular s-flex s-items-center">
                          <Button styleType={"text"} variant="primary">
                            Test Webhook
                          </Button>
                          <OverFlowMenu
                            launchIcon={<EllipsisHorizontalIcon />}
                            menuGroups={[
                              {
                                title: "Webhooks",
                                items: [
                                  {
                                    action: item.link,
                                    label: "View Webhook",
                                    value: "webhook"
                                  },
                                ],
                              },
                            ]}
                            position="left"
                            variant="om-multiple"
                          />
                        </div>
                      }
                    />
                    <Card.Content>
                      <p
                        className={"flex items-center gap-1 text-gray-500 m-0"}
                      >
                        ID{" "}
                        <span>
                          <ArrowRightIcon size={20} />
                        </span>{" "}
                        {item.subText}
                      </p>
                      <a href="#">{item.link}</a>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CreateLayout.Content>
      </CreateLayout.Grid>
    </CreateLayout>
  );
};

export default ApiPage;
