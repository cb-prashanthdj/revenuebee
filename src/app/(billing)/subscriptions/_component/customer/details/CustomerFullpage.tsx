"use client";

import React, { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
  UserIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
  PlusIcon,
  MinusIcon,
  UserGroupIcon,
  BellIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Button,
  Drawer,
  Toggle,
  Badge,
  OverFlowMenu,
  Tabs,
  TabsContent,
  TabsList,
  ContainedList,
  ContainedListItems,
  ContainedListItem,
  ContainedHeader,
  ContainedListLabel,
  ContainedTitle,
  ContainedListValue,
  Table,
  Link as SLink,
} from "cb-sting-react-ts";
import Link from "next/link";
import { CardHeader } from "../../Header";
// import { useCaseSwitcher } from "@/app/store/UseCaseStore";
import { CurrencyCard } from "./heroCard/CurrencyCard";
import CustomerConfig from "./CustomerConfig";
import { CustomerConfigData } from "../data/customerData";
// import { CustomerConfigData } from "@/app/components/customer/data/customerData";

type Props = {
  columns: boolean;
  onClickView: (view) => void;
};

export const CustomerFullpage = ({ columns, onClickView }: Props) => {
  // const { selectedUseCase, selectedUseCaseItem } = useCaseSwitcher();

  const halfLengthCustomerDetails = Math.ceil(CustomerInfoData.length / 2);
  const firstHalfCustomerDetails = CustomerInfoData.slice(
    0,
    halfLengthCustomerDetails
  );
  const secondHalfCustomerDetails = CustomerInfoData.slice(
    halfLengthCustomerDetails
  );
  const halfLengthCustomerConfig = Math.ceil(CustomerConfigData.length / 2);
  const firstHalfCustomerConfig = CustomerConfigData.slice(
    0,
    halfLengthCustomerConfig
  );
  const secondHalfCustomerConfig = CustomerConfigData.slice(
    halfLengthCustomerConfig
  );

  return (
    <>
      <div className="space-y-4 pb-16">
        {/* Hero */}
        <section id="section1" className="scroll-mt-20">
          <Card padding="regular">
            <div className="space-y-4">
              {/* Existing hierarchy */}
              <div className="md:flex gap-8 items-center md:justify-between space-y-2 md:space-y-0 bg-neutral-25 p-4 py-3 rounded">
                <div className="flex gap-4 w-full text-neutral-600 leading-5">
                  <span className="w-5 h-5">
                    <UserGroupIcon />
                  </span>
                  <span>
                    <span className="font-semibold text-primary-600 cursor-pointer">
                      John Wick
                    </span>{" "}
                    is the parent of this customer.
                  </span>
                </div>
                <div className="flex flex-row-reverse md:flex-row">
                  <Button
                    variant={"neutral"}
                    styleType={"text"}
                    size={"regular"}
                  >
                    View Hierarchy
                  </Button>
                </div>
              </div>

              {/* Card header */}
              <div className="flex justify-between flex-wrap">
                <div className="space-y-small pb-large">
                  <h1 className="h3">Sophia Roberts</h1>
                </div>
                <div className="w-content flex gap-xlarge flex-wrap">
                  <div className="flex gap-regular">
                    <Badge variant="primary" size="large">
                      Placeholder
                    </Badge>
                  </div>
                  <div className="flex gap-large flex-wrap">
                    <Button
                      variant={"neutral"}
                      styleType={"default"}
                      size={"regular"}
                    >
                      <PencilIcon /> Edit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Customer info */}
              <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
                <div className="w-full xl:w-1/2">
                  <CustomerDetails data={firstHalfCustomerDetails} />
                </div>
                <div className="w-full xl:w-1/2">
                  <CustomerDetails data={secondHalfCustomerDetails} />
                </div>
              </div>

              {/* Dashboard */}
              <CurrencyCard />
            </div>
          </Card>
        </section>

        {/* Custom fields */}
        {/* {selectedUseCaseItem.id === "uc3" && selectedUseCase.id === "a1" && (
        <section id="section2" className="scroll-mt-20">
            <Card className="">
              <CardHeader title="Custom Fields">
                <div className="flex gap-large flex-wrap">
                  <Button
                    variant={"neutral"}
                    styleType={"text"}
                    size={"regular"}
                  >
                    <PencilIcon /> Edit
                  </Button>
                </div>
              </CardHeader>
              <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
                <div className="w-full ">
                  <CustomerConfig data={customFields} />
                </div>
              </div>
            </Card>
          </section>
        )} */}

        <section id="section2" className="scroll-mt-20">
          <Card className="">
            <CardHeader title="Custom Fields">
              <div className="flex gap-large flex-wrap">
                <Button variant={"neutral"} styleType={"text"} size={"regular"}>
                  <PencilIcon /> Edit
                </Button>
              </div>
            </CardHeader>
            <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
              <div className="w-full ">
                <CustomerConfig data={customFields} />
              </div>
            </div>
          </Card>
        </section>

        {/* Customer Configurations */}
        <section id="section3" className="scroll-mt-20">
          <Card className="">
            <CardHeader title="Customer Configurations">
              <div className="flex gap-large flex-wrap">
                <Button variant={"neutral"} styleType={"text"} size={"regular"}>
                  <PencilIcon /> Edit
                </Button>
              </div>
            </CardHeader>
            <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
              <div className="w-full xl:w-1/2">
                <CustomerConfig data={firstHalfCustomerConfig} />
              </div>
              <div className="w-full xl:w-1/2">
                <CustomerConfig data={secondHalfCustomerConfig} />
              </div>
            </div>
          </Card>
        </section>

        {/* Multiple Subscriptions */}
        <section id="section5" className="scroll-mt-20">
          <div className="bg-neutral-50 rounded-t-md p-4 pb-0 text-xs leading-none font-semibold uppercase">
            3 Subscriptions
          </div>
          <div className="bg-neutral-50 rounded-b-md p-4">
            {/* <div className="pb-4">
              <h1 className="h5 font-medium text-neutral-600">Sophia has subscribed to 3 plans.</h1>
            </div> */}
            <div className="space-y-4">
              {/* Subscription #3 */}
              <Card>
                <CardHeader title="Milk Packet INR Monthly">
                  <div className="flex gap-regular">
                    <Badge variant="green" size="large">
                      Active
                    </Badge>
                  </div>
                  <div className="flex gap-large flex-wrap">
                    <Button
                      icon=""
                      iconPosition="left"
                      onClick={function noRefCheck() {}}
                      size="regular"
                      styleType="text"
                      variant="neutral"
                    >
                      <PencilIcon /> Edit
                    </Button>
                    <OverFlowMenu
                      align="start"
                      launchIcon={<EllipsisVerticalIcon />}
                      menuGroups={[
                        {
                          items: [
                            {
                              action: () => {},
                              label: "Pause",
                              value: "li01",
                            },
                            {
                              action: () => {},
                              label: "Cancel",
                              value: "li01",
                            },
                            {
                              action: () => {},
                              label: "Suspend",
                              value: "li02",
                            },
                            {
                              label: "Remove from list",
                              value: "li03",
                            },
                          ],
                          title:
                            "Your subscription has been upgraded to Superior plan.",
                        },
                      ]}
                      position="left"
                      variant="om-basic"
                    />
                  </div>
                </CardHeader>

                {/* Data */}
                <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
                  <div className="w-full">
                    <CustomerConfig data={Subscription03Data} />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-4">
                  <Button
                    fullWidth
                    variant={"neutral"}
                    styleType={"text"}
                    size={"regular"}
                  >
                    <ChevronUpIcon /> Show less info
                  </Button>
                  {/* <div className="flex gap-4 justify-end">
                    <Button
                      icon=""
                      iconPosition="start"
                      onClick={function noRefCheck() {}}
                      size="regular"
                      styleType="text"
                      variant="neutral"
                    >
                      View in Subscriptions
                    </Button>
                    <Button
                      icon=""
                      iconPosition="start"
                      onClick={function noRefCheck() {}}
                      size="regular"
                      styleType="outline"
                      variant="primary"
                    >
                      Quick Edits
                    </Button>
                  </div> */}
                </div>
              </Card>

              {/* Subscription #2 */}
              <Card>
                <CardHeader title="Milk Packet INR Monthly">
                  <div className="flex gap-regular">
                    <Badge variant="green" size="large">
                      Active
                    </Badge>
                  </div>
                  <div className="flex gap-large flex-wrap">
                    <Button
                      icon=""
                      iconPosition="left"
                      onClick={function noRefCheck() {}}
                      size="regular"
                      styleType="text"
                      variant="neutral"
                    >
                      <PencilIcon /> Edit
                    </Button>
                    <OverFlowMenu
                      align="start"
                      launchIcon={<EllipsisVerticalIcon />}
                      menuGroups={[
                        {
                          items: [
                            {
                              action: () => {},
                              label: "Pause",
                              value: "li01",
                            },
                            {
                              action: () => {},
                              label: "Cancel",
                              value: "li01",
                            },
                            {
                              action: () => {},
                              label: "Suspend",
                              value: "li02",
                            },
                            {
                              label: "Remove from list",
                              value: "li03",
                            },
                          ],
                          title:
                            "Your subscription has been upgraded to Superior plan.",
                        },
                      ]}
                      position="left"
                      variant="om-basic"
                    />
                  </div>
                </CardHeader>

                {/* Data */}
                <div className="grid grid-cols-4 divide-x">
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Subscription ID
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      AzyteoTrnz6WW3hX
                    </div>
                  </div>
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Product Family
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      Sample Family
                    </div>
                  </div>
                  {/* <div>
                      <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">Plan amount</div>
                      <div className="py-0.5 px-4 text-neutral-600">
                        $99.000 USD / Month × 12
                      </div>
                    </div> */}
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Next billing amount
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      $84.00 USD (monthly)
                    </div>
                  </div>
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Next billing date
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      Nov 30 2023
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-8 flex gap-4">
                  <Button
                    fullWidth
                    variant={"neutral"}
                    styleType={"text"}
                    size={"regular"}
                  >
                    <ChevronDownIcon /> Show more info
                  </Button>
                </div>
              </Card>

              {/* Subscription #1 */}
              <Card>
                <CardHeader title="Milk Packet INR Monthly">
                  <div className="flex gap-regular">
                    <Badge variant="yellow" size="large">
                      Paused
                    </Badge>
                  </div>
                  <div className="flex gap-large flex-wrap">
                    <Button
                      icon=""
                      iconPosition="left"
                      onClick={function noRefCheck() {}}
                      size="regular"
                      styleType="text"
                      variant="neutral"
                    >
                      Activate
                    </Button>
                    <Button
                      icon=""
                      iconPosition="left"
                      onClick={function noRefCheck() {}}
                      size="regular"
                      styleType="text"
                      variant="neutral"
                    >
                      <PencilIcon /> Edit
                    </Button>
                    <OverFlowMenu
                      align="start"
                      launchIcon={<EllipsisVerticalIcon />}
                      menuGroups={[
                        {
                          items: [
                            {
                              action: () => {},
                              label: "Pause",
                              value: "li01",
                            },
                            {
                              action: () => {},
                              label: "Cancel",
                              value: "li01",
                            },
                            {
                              action: () => {},
                              label: "Suspend",
                              value: "li02",
                            },
                            {
                              label: "Remove from list",
                              value: "li03",
                            },
                          ],
                          title:
                            "Your subscription has been upgraded to Superior plan.",
                        },
                      ]}
                      position="left"
                      variant="om-basic"
                    />
                  </div>
                </CardHeader>

                {/* Data */}
                <div className="grid grid-cols-4 divide-x">
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Subscription ID
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      16BhkaTlflpueQcW
                    </div>
                  </div>
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Product Family
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      Apartment Management
                    </div>
                  </div>
                  {/* <div>
                      <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">Plan amount</div>
                      <div className="py-0.5 px-4 text-neutral-600">
                        $99.000 USD / Month × 12
                      </div>
                    </div> */}
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Next billing amount
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600">
                      $800.00 USD (yearly)
                    </div>
                  </div>
                  <div>
                    <div className="bg-neutral-25 px-4 py-1.5 font-medium text-neutral-900 leading-4">
                      Next billing date
                    </div>
                    <div className="py-0.5 px-4 text-neutral-600 line-through">
                      Nov 30 2023
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-8 flex gap-4">
                  <Button
                    fullWidth
                    variant={"neutral"}
                    styleType={"text"}
                    size={"regular"}
                  >
                    <ChevronDownIcon /> Show more info
                  </Button>
                </div>
              </Card>

              {/* Add Subscription */}
              <AdditionalSubscription />
            </div>
          </div>
        </section>

        {/* History */}
        <section id="section12" className="scroll-mt-20">
          <div>
            {/* <div className="mt-4 -mb-4 flex gap-2 items-center justify-between">
            <p className="bg-neutral-50 w-full px-4 py-1 rounded-l-md">History</p>
          </div> */}
            <Card>
              <CardHeader title="History"></CardHeader>
              <div>
                <Tabs
                  defaultTabID="tab1"
                  onValueChange={function noRefCheck() {}}
                  tabId="tab1"
                >
                  <TabsList
                    tabStyle="lined"
                    tabs={[
                      {
                        id: "tab1",
                        title: "Invoices",
                      },
                      {
                        id: "tab2",
                        title: "Credit Notes",
                      },
                      {
                        id: "tab3",
                        title: "Quotes",
                      },
                      {
                        id: "tab4",
                        title: "Orders",
                      },
                      {
                        id: "tab5",
                        title: "Email Logs",
                      },
                      {
                        id: "tab6",
                        title: "Transactions",
                      },
                      {
                        id: "tab4",
                        title: "Events",
                      },
                    ]}
                    variant="horizontal"
                    width="full"
                  />
                  <TabsContent onValueChange={() => {}} tabId="tab1">
                    <div className="">
                      <InvoicesTable />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </section>

        {/* Omnichannel Subscriptions */}
        <div>
          <div className="bg-neutral-50 rounded-t-md p-4 pb-0 text-xs leading-none font-semibold uppercase">
            1 Subscription
          </div>
          <div className="bg-neutral-50 rounded-b-md p-4">
            <Card>
              <Card.Content>
                <Tabs
                  defaultTabID="tab1"
                  onValueChange={function noRefCheck() {}}
                  tabId="tab1"
                >
                  <TabsList
                    tabStyle="lined"
                    defaultValue={"tab2"}
                    tabs={[
                      {
                        id: "tab1",
                        title: "Web",
                      },
                      {
                        id: "tab2",
                        title: "Apple App Store",
                      },
                      {
                        id: "tab3",
                        title: "Play Store",
                      },
                    ]}
                    variant="horizontal"
                    width="inline"
                  />
                  <TabsContent onValueChange={() => {}} tabId="tab1">
                    <p className="text-neutral-500 mt-4">
                      No subscriptions found
                    </p>
                  </TabsContent>
                  <TabsContent onValueChange={() => {}} tabId="tab2">
                    <ContainedList
                      align="left"
                      labels="block"
                      onClick={() => {}}
                      padding="regular"
                      variant="basic"
                      className="mt-4"
                    >
                      <ContainedList.Items>
                        <ContainedList.Item>
                          <ContainedList.Label>ID</ContainedList.Label>
                          <ContainedList.Value>
                            <SLink href="/billing/omnichannel/subscriptions/os_upchjf">
                              os_upchjf
                            </SLink>
                          </ContainedList.Value>
                        </ContainedList.Item>
                        <ContainedList.Item>
                          <ContainedList.Label>Status</ContainedList.Label>
                          <ContainedList.Value>
                            <Badge variant="success" rounded="small">
                              active
                            </Badge>
                          </ContainedList.Value>
                        </ContainedList.Item>
                        <ContainedList.Item>
                          <ContainedList.Label>Plan Amount</ContainedList.Label>
                          <ContainedList.Value>₹69,900</ContainedList.Value>
                        </ContainedList.Item>
                        <ContainedList.Item>
                          <ContainedList.Label>Product ID</ContainedList.Label>
                          <ContainedList.Value>
                            premium.monthly
                          </ContainedList.Value>
                        </ContainedList.Item>
                        <ContainedList.Item>
                          <ContainedList.Label>
                            Purchased On
                          </ContainedList.Label>
                          <ContainedList.Value>
                            13 Aug 2024 14:14
                          </ContainedList.Value>
                        </ContainedList.Item>
                      </ContainedList.Items>
                    </ContainedList>
                  </TabsContent>
                  <TabsContent onValueChange={() => {}} tabId="tab3">
                    <p className="text-neutral-500 mt-4">
                      No subscriptions found
                    </p>
                  </TabsContent>
                </Tabs>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Billing Address */}
        <section id="section7" className="scroll-mt-20">
          <div>
            <div className="bg-neutral-50 rounded-t-md p-4 pb-0 text-xs leading-none font-semibold uppercase">
              Billing Addresses
            </div>
            <div className="bg-neutral-50 rounded-b-md p-4">
              <div className="grid grid-cols-2 gap-4 content-stretch">
                <BillingAddress />
                <AdditionalContact />
              </div>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section id="section9" className="scroll-mt-20">
          <div>
            <div className="bg-neutral-50 rounded-t-md p-4 pb-0 text-xs leading-none font-semibold uppercase">
              Payment Methods
            </div>
            <div className="bg-neutral-50 rounded-b-md p-4">
              <div className="grid grid-cols-2 gap-4 content-stretch">
                <Card>
                  {/* <CardHeader title="MasterCard"">
                  <div className="flex items-center gap-2">
                    <span>
                      <Badge
                        variant={"primary"}
                        style={{ fontWeight: "normal" }}>
                        Primary
                      </Badge>
                    </span> */}
                  <div className="flex justify-between items-center -mt-2 -mr-2 mb-3 h-10">
                    <div className="flex gap-2">
                      <span className="size-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="mastercard"
                        >
                          <path
                            fill="#FF5F00"
                            d="M15.245 17.831h-6.49V6.168h6.49v11.663z"
                          ></path>
                          <path
                            fill="#EB001B"
                            d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"
                          ></path>
                          <path
                            fill="#F79E1B"
                            d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"
                          ></path>
                        </svg>
                      </span>
                      {/* <h1 className="h5 tracking-tight">Mastercard</h1> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        <Badge
                          variant={"primary"}
                          style={{ fontWeight: "normal" }}
                        >
                          Primary
                        </Badge>
                      </span>
                      <span>
                        <OverFlowMenu
                          align="start"
                          launchIcon={<EllipsisVerticalIcon />}
                          menuGroups={[
                            {
                              items: [
                                {
                                  action: () => {},
                                  label: "Edit",
                                  value: "li01",
                                },
                                {
                                  label: "Disable",
                                  value: "li02",
                                },
                                {
                                  label: "Delete",
                                  value: "li03",
                                },
                              ],
                              title:
                                "Your subscription has been upgraded to Superior plan.",
                            },
                          ]}
                          position="left"
                          variant="om-basic"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-xl">**** **** **** 5761</div>
                    <div className="flex items-center gap-4 py-2 divide-x divide-neutral-50">
                      <span>
                        <span className="text-neutral-900 font-semibold mr-1">
                          Exp:
                        </span>
                        <span className="whitespace-nowrap">Dec 2024</span>
                      </span>
                      <span className="pl-4 leading-4">
                        Mr. Harish Vaidyanathan
                      </span>
                    </div>
                    <div className="flex gap-4 border-t border-neutral-50 pt-2 divide-x divide-neutral-50">
                      <span className="leading-4">
                        <span className="text-neutral-900 font-semibold mr-1">
                          ID:
                        </span>
                        tok_169lhFTlflwcZP6x
                      </span>
                      <span className="pl-4 leading-4">
                        Chargebee Test Gateway
                      </span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex justify-between items-center -mt-2 -mr-2 mb-3 h-10">
                    <div className="flex gap-2">
                      <span className="size-12">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="visa"
                        >
                          <path
                            fill="#191E6E"
                            d="M13.967 13.837c-.766 0-1.186-.105-1.831-.37l-.239-.109-.271 1.575c.466.192 1.306.357 2.175.37 2.041 0 3.375-.947 3.391-2.404.016-.801-.51-1.409-1.621-1.91-.674-.325-1.094-.543-1.094-.873 0-.292.359-.603 1.109-.603a3.602 3.602 0 0 1 1.455.269l.18.08.271-1.522-.047.01a5.053 5.053 0 0 0-1.74-.297c-1.92 0-3.275.954-3.285 2.321-.012 1.005.964 1.571 1.701 1.908.757.345 1.01.562 1.008.872-.005.471-.605.683-1.162.683zm8.461-5.655h-1.5c-.467 0-.816.125-1.021.583l-2.885 6.44h2.041l.408-1.054 2.49.002c.061.246.24 1.052.24 1.052H24l-1.572-7.023zM20.03 12.71l.774-1.963c-.01.02.16-.406.258-.67l.133.606.449 2.027H20.03zM8.444 15.149h1.944l1.215-7.026H9.66v-.002zM4.923 12.971l-.202-.976v.003l-.682-3.226c-.117-.447-.459-.579-.883-.595H.025L0 8.325c.705.165 1.34.404 1.908.697a.392.392 0 0 1 .18.234l1.68 5.939h2.054l3.061-7.013H6.824l-1.901 4.789z"
                          ></path>
                        </svg>
                      </span>
                      {/* <h1 className="h5 tracking-tight">Visa</h1> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        <OverFlowMenu
                          align="start"
                          launchIcon={<EllipsisVerticalIcon />}
                          menuGroups={[
                            {
                              items: [
                                {
                                  action: () => {},
                                  label: "Edit",
                                  value: "li01",
                                },
                                {
                                  label: "Make Primary",
                                  value: "li02",
                                },
                                {
                                  label: "Disable",
                                  value: "li03",
                                },
                                {
                                  label: "Delete",
                                  value: "li04",
                                },
                              ],
                              title:
                                "Your subscription has been upgraded to Superior plan.",
                            },
                          ]}
                          position="left"
                          variant="om-basic"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <div className="text-xl">**** **** **** 5761</div>
                    <div className="flex items-center gap-4 py-2 divide-x divide-neutral-50">
                      <span>
                        <span className="text-neutral-900 font-semibold mr-1">
                          Exp:
                        </span>
                        <span className="whitespace-nowrap">Dec 2024</span>
                      </span>
                      <span className="pl-4 leading-4">
                        Mr. Harish Vaidyanathan
                      </span>
                    </div>
                    <div className="flex gap-4 border-t border-neutral-50 pt-2 divide-x divide-neutral-50">
                      <span className="leading-4">
                        <span className="text-neutral-900 font-semibold mr-1">
                          ID:
                        </span>
                        tok_169lhFTlflwcZP6x
                      </span>
                      <span className="pl-4 leading-4">
                        Chargebee Test Gateway
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="col-span-2">
                  <AdditionalPaymentMethod />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unbilled Charges */}
        <section id="section10" className="scroll-mt-20">
          <div className="col-span-12 space-y-4">
            <Card>
              <CardHeader title="Unbilled Charges">
                <div className="flex gap-large flex-wrap">
                  <Button
                    variant={"primary"}
                    styleType={"outline"}
                    size={"regular"}
                  >
                    Invoice now
                  </Button>
                </div>
              </CardHeader>

              <div className="divide-y divide-neutral-100">
                <Table>
                  <Table.Tr>
                    <Table.Td>
                      <div className="w-40">
                        <div className="text-dark font-medium text-lg whitespace-nowrap">
                          Rs 10.00
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="grow space-y-small">
                        <div className="leading-5">
                          Use case test plan{" "}
                          <span className="text-lightest font-regular">
                            (10 Sept 24 - 10 Oct 24)
                          </span>
                        </div>
                        <div className="">
                          <div className="text-sm leading-4">
                            Subscription ID:{" "}
                            <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                              idFjijODJoi6852Osdj
                            </a>
                          </div>
                          <div className="text-sm text-lightest">
                            Rs 10.00 x 1 - Discount Rs 0.00
                          </div>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="md:w-32 lg:w-40">
                        <div className="whitespace-nowrap">
                          10 Sept 2024{" "}
                          <span className="text-lightest pl-small">17:52</span>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex justify-end md:w-min">
                        <Button
                          onClick={function Qa() {}}
                          size="regular"
                          styleType="icon-borderless"
                          variant="neutral"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <div className="w-40">
                        <div className="text-dark font-medium text-lg whitespace-nowrap">
                          Rs 10.00
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="grow space-y-small">
                        <div className="leading-5">
                          Use case test plan{" "}
                          <span className="text-lightest font-regular">
                            (10 Sept 24 - 10 Oct 24)
                          </span>
                        </div>
                        <div className="">
                          <div className="text-sm leading-4">
                            Subscription ID:{" "}
                            <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                              idFjijODJoi6852Osdj
                            </a>
                          </div>
                          <div className="text-sm text-lightest">
                            Rs 10.00 x 1 - Discount Rs 0.00
                          </div>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="md:w-32 lg:w-40">
                        <div className="whitespace-nowrap">
                          10 Sept 2024{" "}
                          <span className="text-lightest pl-small">17:52</span>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex justify-end md:w-min">
                        <Button
                          onClick={function Qa() {}}
                          size="regular"
                          styleType="icon-borderless"
                          variant="neutral"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                </Table>

                {/* <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
                <div className="md:w-40 lg:w-48">
                  <div className="text-dark font-medium text-lg whitespace-nowrap">Rs 10.00</div>
                </div>
                <div className="grow space-y-small">
                  <div className="leading-5">Use case test plan <span className="text-lightest font-regular">(10 Sept 24 - 10 Oct 24)</span></div>
                  <div className="">
                    <div className="text-sm leading-4">Subscription ID: <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">idFjijODJoi6852Osdj</a></div>
                    <div className="text-sm text-lightest">Rs 10.00 x 1 - Discount Rs 0.00</div>
                  </div>
                </div>
                <div className="md:w-32 lg:w-40">
                  <div className="whitespace-nowrap">10 Sept 2024 <span className="text-lightest pl-small">17:52</span></div>
                </div>
                <div className="flex justify-end md:w-min">
                  <Button
                    onClick={function Qa() { }}
                    size="regular"
                    styleType="icon-borderless"
                    variant="neutral"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
                <div className="md:w-40 lg:w-48">
                  <div className="text-dark font-medium text-lg whitespace-nowrap">Rs 10.00</div>
                </div>
                <div className="grow space-y-small">
                  <div className="leading-5">Use case test plan <span className="text-lightest font-regular">(10 Sept 24 - 10 Oct 24)</span></div>
                  <div className="">
                    <div className="text-sm leading-4">Subscription ID: <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">idFjijODJoi6852Osdj</a></div>
                    <div className="text-sm text-lightest">Rs 10.00 x 1 - Discount Rs 0.00</div>
                  </div>
                </div>
                <div className="md:w-32 lg:w-40">
                  <div className="whitespace-nowrap">10 Sept 2024 <span className="text-lightest pl-small">17:52</span></div>
                </div>
                <div className="flex justify-end md:w-min">
                  <Button
                    onClick={function Qa() { }}
                    size="regular"
                    styleType="icon-borderless"
                    variant="neutral"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div> */}
              </div>
              <div>
                <div className="p-xlarge bg-neutral-25 flex items-center justify-center flex-col rounded">
                  <div className="max-w-lg text-neutral-600 leading-5 text-center">
                    No unbilled charges found for this customer.{" "}
                    <a className="block text-primary-600 font-medium cursor-pointer hover:underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div></div>
            </Card>
          </div>
        </section>

        {/* Invoice Note */}
        <section id="section11" className="scroll-mt-20">
          <div className="col-span-12 space-y-4">
            {/* <div className="mt-4 flex gap-2 items-center justify-between">
            <p className="bg-neutral-50 w-full px-4 py-1 rounded-md">Invoice Note</p>
          </div> */}
            <Card>
              <CardHeader title="Invoice Note"></CardHeader>
              <InvoiceNote />
            </Card>
          </div>
        </section>

        {/* Account Hierarchy */}

        <div className="col-span-12 space-y-4">
          <Card>
            <CardHeader title="Account Hierarchy"></CardHeader>
            <div>
              <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex flex-col items-stretch">
                <div className="self-center text-center w-full">
                  <Button variant={"neutral"} styleType={"text"}>
                    <PlusIcon /> Add Account Hierarchy
                  </Button>
                </div>
                <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
                  to pay and receive invoices for this customer.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Log */}
        <section id="section14" className="scroll-mt-20">
          <div>
            <Card>
              <div className=" ">
                <ActivityLog />
              </div>
            </Card>
          </div>
        </section>

        {/* Comment */}
        <section id="section13" className="scroll-mt-20">
          <div>
            <Card>
              <div className=" ">
                <CommentForm />
              </div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

const CustomerInfoData = [
  {
    label: "ID",
    value: "16BhkaTlflXi3QRp",
  },
  {
    label: "First Name",
    value: "Douglas",
  },
  {
    label: "Last Name",
    value: "Quaid",
  },
  {
    label: "Email",
    value: "billing@mercedes.com",
  },
  {
    label: "Phone Number",
    value: "(925)-285-0912",
  },
  {
    label: "JSON Metadata",
    value: (
      <a className="text-primary-600 font-medium cursor-pointer hover:underline">
        + Add
      </a>
    ),
  },
];
// const CustomerConfigData = [
//   {
//     label: "Language",
//     value: "English",
//   },
//   {
//     label: "Preferred Currency",
//     value: "USD",
//   },
//   {
//     label: "Direct Debit",
//     value: "Enabled",
//   },
//   {
//     label: "Auto Collection",
//     value: (
//       <Toggle size="small">
//         <p>Hello</p>
//       </Toggle>
//     ),
//   },
//   {
//     label: "Payment terms",
//     value:
//       "Due Upon Receipt. Applies only when customer's auto-collection is off. All invoices will be generated as Posted.",
//   },
//   {
//     label: "Next billing date",
//     value: "Nov 30 2023 11:51",
//   },
//   {
//     label: "Next billing amount",
//     value: (
//       <div>
//         <span className="pr-2">$110.00</span>{" "}
//         <a className="text-primary-600 font-medium cursor-pointer hover:underline">
//           View invoice
//         </a>
//       </div>
//     ),
//   },
//   {
//     label: "Consolidated Invoicing",
//     value:
//       "Use Site Default. A separate invoice will be generated for every subscription charge of this customer.",
//   },
//   {
//     label: "Closure of Invoice",
//     value: "Manual",
//   },
//   // {
//   //   label: "Invoice Note",
//   //   value: (
//   //     <Button variant={"neutral"} styleType={"text"} size={"small"}>
//   //       <PlusIcon /> Add
//   //     </Button>
//   //   ),
//   // },
// ];

const customFields = [
  {
    label: "Customer Site",
    value: "Some website",
  },
  {
    label: "Notes",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    label: "Notes 2",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const Subscription01Data = [
  {
    label: "ID",
    value: "16BhkaTlflpueQcW",
  },
  // {
  //   label: "Status",
  //   value: (
  //     <span>
  //       <Badge variant="green">Active</Badge>
  //     </span>
  //   ),
  // },
  {
    label: "Product Family",
    value: <a>Apartment Management</a>,
  },
  // {
  //   label: "Plan",
  //   value: <a>Additional Units USD Weekly</a>,
  // },
  // {
  //   label: "Plan Amount",
  //   value: "$80.00000000000000000000 USD / Week × 10.00000000",
  // },
  // {
  //   label: "Next Billing Amount",
  //   value: "$800.00 USD",
  // },
  // {
  //   label: "MRR",
  //   value: "$3,476.12 USD",
  // },
  // {
  //   label: "Auto Collection",
  //   value: (
  //     <div>
  //       <div className="flex flex-col !text-left">
  //         <span className="!inline">On (Same as Customer)</span>{" "}
  //         <a className="text-primary-500">Change</a>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   label: "Next billing date",
  //   value: "Nov 30 2023 11:51",
  // },
  // {
  //   label: "Invoice Note",
  //   value: (
  //     <Button variant={"neutral"} styleType={"text"} size={"small"}>
  //       <PlusIcon /> Add
  //     </Button>
  //   ),
  // },
];
const Subscription02Data = [
  {
    label: "ID",
    value: "AzyteoTrnz6WW3hX",
  },
  // {
  //   label: "Status",
  //   value: (
  //     <span>
  //       <Badge variant="green">Active</Badge>
  //     </span>
  //   ),
  // },
  {
    label: "Product Family",
    value: <a>Sample Family</a>,
  },
  // {
  //   label: "Plan",
  //   value: <a>Early bird Sample USD Monthly</a>,
  // },
  // {
  //   label: "Plan Amount",
  //   value: "$99.00000000000000000000 USD / Month × 1.00000000",
  // },
  // {
  //   label: "Coupon 01",
  //   value: (
  //     <div>
  //       <div className="flex flex-col !text-left">
  //         <a className="!inline text-primary-500">
  //           Early Bird ($10.00 USD off for forever)
  //         </a>{" "}
  //         <a className="text-red-500">Remove</a>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   label: "Coupon 02",
  //   value: (
  //     <div>
  //       <div className="flex flex-col !text-left">
  //         <a className="!inline text-primary-500">
  //           USD $5 ($5.00 USD off for forever)
  //         </a>{" "}
  //         <a className="text-red-500">Remove</a>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   label: "Next Billing Amount",
  //   value: "$84.00 USD",
  // },
  // {
  //   label: "MRR",
  //   value: "$89.00 USD",
  // },
  // {
  //   label: "Auto Collection",
  //   value: (
  //     <div>
  //       <div className="flex flex-col !text-left">
  //         <span className="!inline">On (Same as Customer)</span>{" "}
  //         <a className="text-primary-500">Change</a>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   label: "Next billing date",
  //   value: "Dec 24 2023 11:51",
  // },
  // {
  //   label: "Invoice Note",
  //   value: (
  //     <Button variant={"neutral"} styleType={"text"} size={"small"}>
  //       <PlusIcon /> Add
  //     </Button>
  //   ),
  // },
];
const Subscription03Data = [
  {
    label: "ID",
    value: "AzZV6ETpu67Rt2BW",
  },
  // {
  //   label: "Status",
  //   value: (
  //     <span>
  //       <Badge variant="green">Active</Badge>
  //     </span>
  //   ),
  // },
  {
    label: "Product Family",
    value: <a>Dairy</a>,
  },
  {
    label: "Plan",
    value: (
      <a
        className="!inline text-primary-600 font-medium cursor-pointer hover:underline"
        href={"#"}
      >
        Milk Packet INR Monthly
      </a>
    ),
  },
  {
    label: "Plan Amount",
    value: "Rs.3,000.00000000000000000000 INR / Month × 1.00000000",
  },
  {
    label: "Addons",
    value: (
      <div className=" w-full space-y-regular">
        <div className="flex items-center justify-between w-full">
          <div>
            <div>
              <a
                className="!inline text-primary-600 font-medium cursor-pointer hover:underline"
                href={"#"}
              >
                Milk Packet INR Monthly
              </a>
            </div>
            ($300.00 USD / Month × 1.00000000)
          </div>
          <div>
            <Button styleType="link" size="small" variant="neutral">
              Usage Details
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full pt-regular">
          <div>
            <div>
              <a
                className="!inline text-primary-600 font-medium cursor-pointer hover:underline"
                href={"#"}
              >
                Milk Packet INR Monthly
              </a>
            </div>
            ($300.00 USD / Month × 1.00000000)
          </div>
          <div>
            <Button styleType="link" size="small" variant="neutral">
              Usage Details
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full pt-regular">
          <div>
            <div>
              <a
                className="!inline text-primary-600 font-medium cursor-pointer hover:underline"
                href={"#"}
              >
                Milk Packet INR Monthly
              </a>
            </div>
            ($300.00 USD / Month × 1.00000000)
          </div>
          <div>
            <Button styleType="link" size="small" variant="neutral">
              Usage Details
            </Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Coupon",
    value: (
      <div>
        <div className="flex !items-center justify-between gap-4 !text-left">
          <a className="!inline text-primary-600 font-medium cursor-pointer hover:underline">
            Special Offer (10% off for forever)
          </a>
          <Button
            onClick={() => {}}
            size="small"
            styleType="icon-borderless"
            variant="neutral"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    ),
  },
  {
    label: "Next Billing Amount",
    value: "Rs.2,700.00 INR",
  },
  {
    label: "MRR",
    value: "Rs.2,700.00 INR",
  },
  {
    label: "Auto Collection",
    value: (
      <div>
        <div className="flex !items-center justify-between !text-left">
          <span className="!inline">On (Same as Customer)</span>
          <Button
            onClick={() => {}}
            size="small"
            styleType="icon-borderless"
            variant="neutral"
          >
            <PencilIcon />
          </Button>
        </div>
      </div>
    ),
  },
  {
    label: "Next billing date",
    value: "Apr 01 2023 11:51",
  },
  // {
  //   label: "Invoice Note",
  //   value: (
  //     <Button variant={"neutral"} styleType={"text"} size={"small"}>
  //       <PlusIcon /> Add
  //     </Button>
  //   ),
  // },
];
type BillingDetail = {
  label: string;
  value: string | React.ReactNode;
};

export const CustomerDetails = ({ data }: { data: BillingDetail[] }) => {
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

// export const CustomerConfig = ({ data }: { data: BillingDetail[] }) => {
//   return (
//     <ContainedList labels="block" padding="large" variant="basic">
//       <ContainedListItems>
//         {data.map((detail) => (
//           <ContainedListItem key={detail.label}>
//             <ContainedListLabel>{detail.label}</ContainedListLabel>
//             <ContainedListValue><>{detail.value}</></ContainedListValue>
//           </ContainedListItem>
//         ))}
//       </ContainedListItems>
//     </ContainedList>
//   );
// };

export const Subscription01 = ({ data }: { data: BillingDetail[] }) => {
  return (
    <ContainedList labels="block" padding="large" variant="basic">
      <ContainedListItems>
        {data.map((detail) => (
          <ContainedListItem key={detail.label}>
            <ContainedListLabel>{detail.label}</ContainedListLabel>
            <ContainedListValue>
              <>{detail.value}</>
            </ContainedListValue>
          </ContainedListItem>
        ))}
      </ContainedListItems>
    </ContainedList>
  );
};

export const Subscription02 = ({ data }: { data: BillingDetail[] }) => {
  return (
    <ContainedList labels="block" padding="large" variant="basic">
      <ContainedListItems>
        {data.map((detail) => (
          <ContainedListItem key={detail.label}>
            <ContainedListLabel>{detail.label}</ContainedListLabel>
            <ContainedListValue>
              <>{detail.value}</>
            </ContainedListValue>
          </ContainedListItem>
        ))}
      </ContainedListItems>
    </ContainedList>
  );
};

export const AdditionalSubscription = () => {
  return (
    <>
      <div className="w-full">
        <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
          <div className="self-center text-center w-full">
            <Button variant={"neutral"} styleType={"text"}>
              <PlusIcon /> Add Subscription
            </Button>
            <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
              To offer access to other valuable features and ongoing updates for
              a predictable cost..
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const BillingAddress = () => {
  return (
    <>
      <Card>
        <CardHeader title="Harish Vaidyanathan">
          <div className="flex items-center gap-2">
            <span>
              <Badge variant={"primary"} style={{ fontWeight: "normal" }}>
                Primary
              </Badge>
            </span>
            <span>
              <OverFlowMenu
                align="start"
                launchIcon={<EllipsisVerticalIcon />}
                menuGroups={[
                  {
                    items: [
                      {
                        action: () => {},
                        label: "Edit",
                        value: "li01",
                      },
                      {
                        label: "Delete",
                        value: "li03",
                      },
                    ],
                    title:
                      "Your subscription has been upgraded to Superior plan.",
                  },
                ]}
                position="left"
                variant="om-basic"
              />
            </span>
          </div>
        </CardHeader>
        <div className="space-y-1 divide-y divide-neutral-50">
          {/* <div className="flex gap-4 items-center pb-1">
            <UserIcon className="h-4 w-4 text-neutral-500" />
            <span className="text-base font-semibold">Harish Vaidyanathan</span>
          </div> */}
          <div className="flex gap-4 items-center pt-2 pb-1">
            <span className="h-4 w-4">
              <EnvelopeIcon className="h-4 w-4 text-neutral-500" />
            </span>
            <span className="leading-5">
              1945 Berkeley Way, Apt 319 Berkeley 94704 United States
            </span>
          </div>
          <div className="flex gap-4 items-center pt-2 pb-1">
            <PhoneIcon className="h-4 w-4 text-neutral-500" />
            <span>+1716 206 9994</span>
          </div>
          <div className="flex gap-4 items-center pt-2 pb-1">
            <EnvelopeIcon className="h-4 w-4 text-neutral-500" />
            <span>harish@gmail.com</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export const AdditionalContact = () => {
  return (
    <>
      <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
        <div className="self-center text-center w-full">
          <Button variant={"neutral"} styleType={"text"}>
            <PlusIcon /> Add Billing Contact
          </Button>
          <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
            To send invoices, payment, and subscription-related emails.
          </div>
        </div>
      </div>
    </>
  );
};

export const PaymentMethod01 = () => {
  return (
    <>
      {/* <ContainedList labels="block" padding="large" variant="basic">
        <ContainedListItems>
          {data.map((detail) => (
            <ContainedListItem>
              <ContainedListLabel>{detail.label}</ContainedListLabel>
              <ContainedListValue>{detail.value}</ContainedListValue>
            </ContainedListItem>
          ))}
        </ContainedListItems>
      </ContainedList> */}
    </>
  );
};

export const AdditionalPaymentMethod = () => {
  return (
    <>
      <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
        <div className="self-center text-center w-full">
          <Button variant={"neutral"} styleType={"text"}>
            <PlusIcon /> Add Payment Method
          </Button>
          <div className="max-w-lg mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
            To increase customer convenience, ensure a smooth checkout
            experience, and reduces involuntary churn.
          </div>
        </div>
      </div>
    </>
  );
};

export const InvoicesTable = () => {
  return (
    <>
      <div>
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-row-header-cell ">Invoice # </th>
              <th className="table-row-header-cell w-0 whitespace-nowrap">
                Status{" "}
              </th>
              <th className="table-row-header-cell ">Issued On </th>
              <th className="table-row-header-cell ">Amount </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="table-row">
              <td className="undefined">16BhkaTlflXi3QRp</td>
              <td className="w-[130px]">
                <Badge variant="green">Paid</Badge>
              </td>
              <td className="undefined">15-Aug-22 14:30</td>
              <td className="undefined">£500</td>
            </tr>
            <tr className="table-row">
              <td className="undefined">25BhkaTlflXi3QRy</td>
              <td className="w-[130px]">
                <Badge variant="info">Posted</Badge>
              </td>
              <td className="undefined">24-Aug-22 23:30</td>
              <td className="undefined">£1400</td>
            </tr>
            <tr className="table-row">
              <td className="undefined">26BhkaTlflXi3QRz</td>
              <td className="w-[130px]">
                <Badge variant="yellow">Payment Due</Badge>
              </td>
              <td className="undefined">25-Aug-23 00:30</td>
              <td className="undefined">£1500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const InvoiceNote = () => {
  return (
    <>
      <div className="space-y-4">
        {/* If note not doesn't exist */}
        {/* <div className="flex flex-col items-center border border-dashed border-neutral-200 py-8 rounded">
          <div className="">
            <Button variant={"neutral"} styleType={"text"}>
              <PlusIcon /> Add Customer Invoice Note
            </Button>
          </div>
          <p className="max-w-lg text-neutral-600 leading-5 pt-2 text-center">
            To display personalized information on invoices of this customer.{" "}
            <a>Learn more</a>
          </p>
        </div> */}

        {/* Note */}
        <div className="space-y-4">
          <div className="bg-neutral-25 flex gap-4 p-4 rounded-b">
            <p className="w-full">
              Thank you for your continued business! We appreciate your
              partnership.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {}}
                size="small"
                styleType="icon-borderless"
                variant="neutral"
              >
                <PencilIcon />
              </Button>
              <Button
                onClick={() => {}}
                size="small"
                styleType="icon-borderless"
                variant="neutral"
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Toggle size="small" checked />
            <div className="flex gap-2 text-neutral-500">
              <span>Show note on all invoices generated on this site.</span>{" "}
              <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                Preview
              </a>{" "}
              <span className="text-neutral-100">|</span>{" "}
              <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                Review Invoices configuration
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ActivityLog = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState("hide");
  const toggleDrawer = () => {
    setIsDrawerOpen(isDrawerOpen === "hide" ? "show" : "hide");
  };

  return (
    <>
      <CardHeader title="Activity Log"></CardHeader>
      <div className="divide-y divide-neutral-100">
        <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
          <div className="flex md:flex-none md:w-40 lg:w-48">
            <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
              <div className="text-sm text-lightest leading-5">
                <div>
                  <span className="text-dark font-medium whitespace-nowrap">
                    19-Aug-2024
                  </span>{" "}
                  17:27
                </div>
              </div>
              <div>
                <Badge variant="neutral">Scheduled activity</Badge>
              </div>
            </div>
          </div>
          <ul className="grow space-y-regular !list-disc pl-large">
            <li className="leading-5">
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                Subscription
              </a>{" "}
              modified.
            </li>
            <li className="leading-5">
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                Invoice
              </a>{" "}
              of <span className="font-semibold text-darkest">$21.00</span>{" "}
              generated and marked as payment due.{" "}
              <span className="font-semibold text-darkest">$21.00</span> to be
              collected.
            </li>
          </ul>
          <div className="flex justify-end md:w-min">
            <Button
              onClick={toggleDrawer}
              size="regular"
              styleType="text"
              variant="neutral"
            >
              View details
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
          <div className="flex md:flex-none md:w-40 lg:w-48">
            <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
              <div className="text-sm text-lightest leading-5">
                <div>
                  <span className="text-dark font-medium whitespace-nowrap">
                    12-Aug-2024
                  </span>{" "}
                  12:36
                </div>
                <div className="truncate">mathumitha@chargebee.com</div>
              </div>
              <div>
                <Badge variant="neutral">Via Chargebee interface</Badge>
              </div>
            </div>
          </div>
          <ul className="grow space-y-regular !list-disc pl-large">
            <li className="leading-5">
              Billing address modified for{" "}
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                customer
              </a>
            </li>
          </ul>
          <div className="flex justify-end md:w-min">
            <Button
              onClick={toggleDrawer}
              size="regular"
              styleType="text"
              variant="neutral"
            >
              View details
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
          <div className="flex md:flex-none md:w-40 lg:w-48">
            <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
              <div className="text-sm text-lightest leading-5">
                <div>
                  <span className="text-dark font-medium whitespace-nowrap">
                    09 Aug 2024
                  </span>{" "}
                  00:00
                </div>
              </div>
              <div>
                <Badge variant="neutral">Scheduled activity</Badge>
              </div>
            </div>
          </div>
          <ul className="grow space-y-regular !list-disc pl-large">
            <li className="leading-5">
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                Subscription
              </a>{" "}
              modified.
            </li>
            <li className="leading-5">
              Draft{" "}
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                Invoice
              </a>{" "}
              of <span className="font-semibold text-darkest">$110.00</span>{" "}
              generated and marked as pending.
            </li>
          </ul>
          <div className="flex justify-end md:w-min">
            <Button
              onClick={toggleDrawer}
              size="regular"
              styleType="text"
              variant="neutral"
            >
              View details
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
          <div className="flex md:flex-none md:w-40 lg:w-48">
            <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
              <div className="text-sm text-lightest leading-5">
                <div>
                  <span className="text-dark font-medium whitespace-nowrap">
                    01 Aug 2024
                  </span>{" "}
                  15:23
                </div>
                <div className="truncate">akhtar.sayyed@chargebee.com</div>
              </div>
              <div>
                <Badge variant="neutral">Via Chargebee interface</Badge>
              </div>
            </div>
          </div>
          <ul className="grow space-y-regular !list-disc pl-large">
            <li className="leading-5">
              Active{" "}
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                subscription
              </a>{" "}
              created for unit_plan1720163957578_usd_month plan.
            </li>
            <li className="leading-5">
              <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                Invoice
              </a>{" "}
              of <span className="font-semibold text-darkest">$4,550.00</span>{" "}
              generated and marked as payment due.{" "}
              <span className="font-semibold text-darkest">$4,550.00</span> to
              be collected.
            </li>
          </ul>
          <div className="flex justify-end md:w-min">
            <Button
              onClick={toggleDrawer}
              size="regular"
              styleType="text"
              variant="neutral"
            >
              View details
            </Button>
          </div>
        </div>
      </div>

      {/* Show more */}
      <div className="pt-large flex gap-4">
        <Button
          fullWidth
          variant={"neutral"}
          styleType={"text"}
          size={"regular"}
        >
          <ChevronDownIcon /> Show more
        </Button>
      </div>

      {/* Drawer for Details */}
      {isDrawerOpen && (
        <Drawer
          hasCloseIcon
          height="regular"
          onClose={toggleDrawer}
          placement="right"
          show={isDrawerOpen}
          title="Activity Log Details"
        >
          <div className="py-large space-y-large">Content</div>
        </Drawer>
      )}
    </>
  );
};

export const CommentForm = () => {
  return (
    <>
      <CardHeader title="Leave a comment"></CardHeader>
      <div>
        <div className="inputfield inputfield-large w-full">
          <div>
            <div className="relative">
              <textarea
                className="textarea-regular"
                placeholder="Write a comment"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={function noRefCheck() {}}
              size="regular"
              styleType="outline"
              variant="primary"
            >
              Save Comment
            </Button>
            <Button
              onClick={function noRefCheck() {}}
              size="regular"
              styleType="text"
              variant="neutral"
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="space-y-2 pt-6">
          {/* Comment */}
          <div className="bg-neutral-25">
            <div className="flex gap-2 text-sm bg-neutral-25 px-3 pt-3 rounded-t">
              <span className="font-semibold text-neutral-600 leading-none">
                gianni@chargebee.com
              </span>
              <span className="italic text-neutral-600 leading-none border-l border-neutral-100 pl-2">
                21 Mar 2024, 05:04
              </span>
            </div>
            <div className="flex gap-8 p-3 rounded-b">
              <div className="leading-5">
                There are a lot of theories about why Kafka wrote The
                Metamorphosis! Some say it reflects his feelings of alienation,
                while others think it&apos;s a commentary on modern society.
                Maybe it&apos;s a bit of both!
              </div>
              <span>
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="icon-borderless"
                  variant="neutral"
                >
                  <TrashIcon />
                </Button>
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="bg-neutral-25">
            <div className="flex gap-2 text-sm bg-neutral-25 px-3 pt-3 rounded-t">
              <span className="font-semibold text-neutral-600 leading-none">
                gianni@chargebee.com
              </span>
              <span className="italic text-neutral-600 leading-none border-l border-neutral-100 pl-2">
                21 Mar 2024, 05:04
              </span>
            </div>
            <div className="flex gap-8 p-3 rounded-b">
              <div className="leading-5">
                Did Gregor&apos;s transformation symbolize something deeper?
                Maybe Kafka was channeling his own anxieties about work and
                family expectations. The story is so weird, it makes you think!
              </div>
              <span>
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="icon-borderless"
                  variant="neutral"
                >
                  <TrashIcon />
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
