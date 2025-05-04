"use client";

import { CreateLayout } from "@/components/templates/CreateLayout";
import {
  Button,
  Card,
  Column,
  Grid,
  Link,
  Notification,
  CheckList, CreateHeader,
} from "cb-sting-react-ts";
import React, { useState } from "react";
import { AlertCircleIcon, ExternalLinkIcon, LightbulbIcon } from "lucide-react";

const BusinessEntitiesPage = () => {
  // State to track selected checklist values
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Handle checklist changes
  const handleCheckList = (newSelectedValues: string[]) => {
    setSelectedValues(newSelectedValues);
  };

  // Check if both checkboxes are selected to enable the button
  const allChecked = selectedValues.includes("1") && selectedValues.includes("2");

  return (
      <div>
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
              subtitle={"Business entities"}
          />
          <div className="min-h-screen">
            <Grid cols={12} gap="large">
              <Column span={8} className="py-16 px-12">
                <div className="space-y-8">
                  <Card>
                    <h1 className="text-2xl font-bold">Business entities</h1>
                    <p className="text-gray-700">
                      Create and manage multiple business entities in one
                      Chargebee site, each with its own branding and settings for
                      invoicing, tax, currency, and more.
                    </p>

                    <Card background="gray-50" depth="flat" className="p-6">
                      <div className="space-y-6">
                        <div className="bg-gray-100 p-4 rounded-md space-y-2">
                          <h3 className="text-xl font-semibold">Important</h3>
                          <p>
                            This feature significantly changes your Chargebee
                            site. Please review the following documentation before
                            proceeding:
                          </p>
                          <Link
                              href="#"
                              className="flex items-center text-blue-600 font-medium"
                          >
                            Learn how business entities impact your site's
                            operations and integrations
                            <ExternalLinkIcon className="ml-1" size={15} />
                          </Link>
                        </div>

                        <CheckList
                            align="vertical"
                            listDescription=""
                            onChangeLogic={handleCheckList}
                            selectedValues={selectedValues}
                            title=""
                            variant="basic"
                        >
                          <CheckList.Item value="1">
                            I've reviewed the documentation and understand the
                            impacts of this feature.
                          </CheckList.Item>
                          <CheckList.Item value="2">
                            I acknowledge that I have not tested this feature on
                            the test site connected to this account. However, I
                            confirm that I have tested it on another test site.
                          </CheckList.Item>
                        </CheckList>
                        <Notification
                            icon
                            size="small"
                            variant="red"
                            width="inline"
                            iconContent={<AlertCircleIcon size={12}/>}
                        >
                          <p className="m-0 pt-1">
                            This action cannot be undone.
                          </p>
                        </Notification>

                        <div className="pt-2">
                          <Button
                              styleType="outline"
                              disabled={!allChecked}
                          >
                            Proceed to Create a Business Entity
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Card>
                </div>
              </Column>
              <Column span={4} className="py-16 pr-12">
                <div className="space-y-8">
                  <Card
                      background="white"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <LightbulbIcon size={24} color="#f97316" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Try It in a New Site
                        </h3>
                        <p className="text-gray-700 mb-2">
                          Want to explore this feature without impacting your
                          current site? Test it in a new site.{" "}
                          <Link href="#" className="text-blue-600">
                            Create one now
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card
                      background="white"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Need help merging accounts?
                      </h3>
                      <p className="text-gray-700">
                        Request support to merge existing Chargebee accounts as
                        business entities into this site.
                      </p>

                    </div>
                    <Link href={ '#'} styleType="text" className="font-medium text-sm">
                      Request support
                    </Link>
                  </Card>

                  <Card
                      background="white"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Your integrations will be paused
                      </h3>
                      <div className="flex gap-2">
                        {/* Integration icons */}
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                        <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                        <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">
                        Some of your integrations will be temporarily paused after
                        you create a busisness entity. Don't worry, we'll guide
                        you through the steps to resume the sync once the entity
                        is created.
                      </p>
                      <Link
                          href="#"
                          className="flex items-center text-blue-600 hover:underline font-medium gap-1 text-sm "
                      >
                        Learn more
                        <ExternalLinkIcon className="mb-1" size={15} />
                      </Link>
                    </div>
                  </Card>
                </div>
              </Column>
            </Grid>
          </div>
        </CreateLayout>
      </div>
  );
};

export default BusinessEntitiesPage;