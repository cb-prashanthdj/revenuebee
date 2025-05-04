"use client";

import { CreateLayout } from "@/components/templates/CreateLayout";
import {
  Badge,
  Button,
  Card,
  Column,
  Grid,
  CStackedItem,
  CStackedList,
} from "cb-sting-react-ts";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const ConfigurationPage = () => {
  const router = useRouter();
  return (
    <div>
      <CreateLayout>
        <Grid cols={12} gap="large">
          <Column span={12}>
            <div className="p-12 space-y-12">
              {/* Advanced section */}
              <div>
                <Grid cols={12} gap="large" className="space-x-10">
                  <Column span={3}>
                    <h2 className="text-xl font-semibold">Advanced</h2>
                    <p className="text-gray-600 text-sm ">
                      Collect additional data from your customers using custom
                      fields.
                    </p>
                  </Column>
                  <Column span={9}>
                    <div className="w-2/3">
                      <Card
                        padding={"none"}
                        background="white"
                        depth="flat"
                        className="border rounded-lg"
                      >
                        <CStackedList
                          border="none"
                          divider
                          onItemClick={() => {}}
                          selectionType="single"
                        >
                          <CStackedItem
                            id="custom-fields"
                            onItemClick={() => {}}
                            title="Custom fields"
                            subTitle="Configure custom fields to collect additional information about customers, subscriptions, plans, and addons."
                            actionElement={
                              <div className="flex items-center">
                                <ChevronRight size={20} />
                              </div>
                            }
                          />
                          <CStackedItem
                            id="reason-codes"
                            onItemClick={() => {}}
                            title="Reason Codes"
                            subTitle="Create and manage the reason codes you can choose while cancelling subscriptions, voiding invoices, and more."
                            actionElement={<ChevronRight size={20} />}
                          />
                          <CStackedItem
                            id="billing-logiq"
                            onItemClick={() => {
                              router.push("/configure-chargebee/billing-logiq");
                            }}
                            title="Billing LogiQ"
                            subTitle=""
                            actionElement={<ChevronRight size={20} />}
                          />
                        </CStackedList>
                      </Card>
                    </div>
                  </Column>
                </Grid>
              </div>

              {/* Site management section */}
              <div>
                <Grid cols={12} gap="large" className="space-x-10">
                  <Column span={3}>
                    <h2 className="text-xl font-semibold">Site management</h2>
                    <p className="text-gray-600 text-sm">
                      Manage your business entities, test sites, and
                      configurations, and more.
                    </p>
                  </Column>
                  <Column span={9}>
                    <div className="w-2/3 cursor-pointer">
                      <Card
                        padding={"none"}
                        background="white"
                        depth="flat"
                        className="border rounded-lg"
                      >
                        <CStackedList
                          border="none"
                          divider
                          onItemClick={() => {}}
                          selectionType="single"
                        >
                          <CStackedItem
                            id="sites"
                            onItemClick={() => {
                              router.push(
                                "/configure-chargebee/billing-logiq/sites"
                              );
                            }}
                            title="Sites"
                            subTitle="Create and manage multiple business entities in one Chargebee site, each with its own settings for invoices, taxes, currency, etc."
                            actionElement={<ChevronRight size={20} />}
                          />
                          <CStackedItem
                            id="business-profile"
                            onItemClick={() => {}}
                            title="Business profile"
                            subTitle="Create and manage multiple business entities in one Chargebee site, each with its own settings for invoices, taxes, currency, etc."
                            actionElement={<ChevronRight size={20} />}
                          />
                          <CStackedItem
                            id="business-entities"
                            onItemClick={() => {
                              router.push(
                                "/configure-chargebee/business-entity"
                              );
                            }}
                            title="Business entities"
                            subTitle="Create and manage multiple business entities in one Chargebee site, each with its own settings for invoices, taxes, currency, etc."
                            actionElement={<ChevronRight size={20} />}
                          />
                        </CStackedList>
                      </Card>
                    </div>
                  </Column>
                </Grid>
              </div>

              {/* Tools section */}
              <div>
                <Grid cols={12} gap="large" className="space-x-10">
                  <Column span={3}>
                    <h2 className="text-xl font-semibold">Tools</h2>
                    <p className="text-gray-600 text-sm ">
                      Test your configurations to see how they pan out over
                      time.
                    </p>
                  </Column>
                  <Column span={9}>
                    <div className="w-2/3 cursor-pointer">
                      <Card
                        padding={"none"}
                        background="white"
                        depth="flat"
                        className="border rounded-lg"
                      >
                        <CStackedList
                          border="none"
                          divider
                          onItemClick={() => {}}
                          selectionType="single"
                        >
                          <CStackedItem
                            id="time-machine"
                            onItemClick={() => {
                              router.push("/configure-chargebee/time-machine");
                            }}
                            title={"Time Machine"}
                            subTitle="Chargebee's virtual time traveling tool lets you simulate the impact of the billing rules you set for your business."
                            actionElement={<ChevronRight size={20} />}
                          />
                        </CStackedList>
                      </Card>
                    </div>
                  </Column>
                </Grid>
              </div>

              {/* API Keys and Events section */}
              <div>
                <Grid cols={12} gap="large" className="space-x-10">
                  <Column span={3}>
                    <h2 className="text-xl font-semibold">
                      API Keys and Events
                    </h2>
                    <p className="text-gray-600 text-sm ">
                      Manage your site's API keys and events settings.
                    </p>
                  </Column>
                  <Column span={9}>
                    <div className="w-2/3 cursor-pointer">
                      <Card
                        padding={"none"}
                        background="white"
                        depth="flat"
                        className="border rounded-lg"
                      >
                        <CStackedList
                          border="none"
                          divider
                          onItemClick={() => {}}
                          selectionType="single"
                        >
                          <CStackedItem
                            id="api-keys"
                            onItemClick={() => {
                              router.push("/configure-chargebee/settings/api");
                            }}
                            title={"API keys"}
                            actionElement={<ChevronRight size={20} />}
                          />
                          <CStackedItem
                            id="webhooks"
                            onItemClick={() => {}}
                            title={"Webhooks"}
                            actionElement={<ChevronRight size={20} />}
                          />
                          <CStackedItem
                            id="event-streams"
                            onItemClick={() => {}}
                            title={"Event Streams"}
                            actionElement={<ChevronRight size={20} />}
                          />
                        </CStackedList>
                      </Card>
                    </div>
                  </Column>
                </Grid>
              </div>
            </div>
          </Column>
        </Grid>
      </CreateLayout>
    </div>
  );
};

export default ConfigurationPage;
