"use client";

import { CreateLayout } from "@/components/templates/CreateLayout";
import {
  Button,
  Card,
  Column,
  CSelect,
  Grid,
  Link,
  Notification,
} from "cb-sting-react-ts";
import React from "react";
import { InfoIcon, SparklesIcon } from "lucide-react";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";

const TimeMachinePage = () => {
  const { isTestSite } = useSiteConfigStore();
  return (
    <div>
      <CreateLayout>
        <div className="bg-[#0372E1] min-h-screen">
          <Grid cols={12} gap="large">
            <Column span={2}>{""}</Column>
            <Column span={5} className="py-16">
              <div className="space-y-8">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-4 s-text-white">
                    Time Machine
                  </h1>
                  <p className="text-xl">
                    Simulates the effects of your billing configurations and how
                    they pan out over time.
                  </p>
                </div>
                {isTestSite && (
                  <Notification
                    icon
                    size="small"
                    variant="yellow"
                    width="full"
                    iconContent={<SparklesIcon color={'#EC5228'} className="my-2 ml-2 " />}
                  >
                    <div className="flex flex-col gap-2 py-2">
                      <h6 className={'font-semibold text-lg'}>
                        Test this feature without affecting your current site’s
                        setup
                      </h6>
                      <p>
                        Explore this feature safely in a sandbox with your
                        existing configurations.{' '}
                        <span className={'font-semibold'}><Link href={'#'}>Test in a sandbox</Link></span>
                      </p>
                    </div>
                  </Notification>
                )}

                <Card background="white" depth="flat" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      Choose a feature to test
                    </h3>

                    <div className="w-1/2">
                      <CSelect
                        labelText=""
                        onValueChange={() => {}}
                        placeholder="Blank Slate"
                        size="regular"
                        value="Blank Slate"
                      >
                        <CSelect.Item value="Blank Slate">
                          Blank Slate
                        </CSelect.Item>
                        <CSelect.Item value="Option 2">Option 2</CSelect.Item>
                        <CSelect.Item value="Option 3">Option 3</CSelect.Item>
                      </CSelect>
                      <p className="mt-2 text-gray-600">
                        Start with a blank slate with no sample data. Create
                        your own initial conditions by setting up subscriptions
                        manually.
                      </p>
                    </div>

                    <div className="w-1/2">
                      <h3 className="text-xl font-semibold mb-3">
                        Travel back by?
                      </h3>
                      <CSelect
                        labelText=""
                        onValueChange={() => {}}
                        placeholder="Six Months"
                        size="regular"
                        value="Six Months"
                      >
                        <CSelect.Item value="Six Months">
                          Six Months
                        </CSelect.Item>
                        <CSelect.Item value="One Year">One Year</CSelect.Item>
                        <CSelect.Item value="Two Years">Two Years</CSelect.Item>
                      </CSelect>
                      <p className="mt-2 text-gray-600">
                        Choose the appropriate time duration based on your
                        plan's billing period.
                      </p>
                    </div>

                    {isTestSite && (
                      <Notification
                        icon
                        size="small"
                        variant="neutral"
                        width="full"
                        iconContent={<InfoIcon />}
                      >
                        <p className={"m-0 pt-1"}>
                          Note: Your customer data in this test site will be
                          cleared
                        </p>
                      </Notification>
                    )}

                    <div className="flex gap-4 justify-end mt-4">
                      <Button styleType="outline">
                        No, thanks. I'll stay put
                      </Button>
                      <Button>
                        Enter Time Machine
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Column>
            {/*<Column span={3}></Column>*/}
          </Grid>
        </div>
      </CreateLayout>
    </div>
  );
};

export default TimeMachinePage;
