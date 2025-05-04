"use client";

import { autoCollectionOptions } from "@/app/(billing)/subscriptions/_component/data/subscriptionData";
// import { UsageSummary } from "@/app/(billing)/usages/_components/UsageSummary";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  ContainedList,
  Drawer,
  OverFlowMenu,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  // PlusIcon,
  Toggle,
  Notification,
} from "cb-sting-react-ts";
import React, { useState, useEffect } from "react";
import { PlanCard } from "@/app/(billing)/subscriptions/_component/details/heroCard/PlanCard";
import SubscriptionConfig from "@/app/(billing)/subscriptions/_component/details/SubscriptionConfig";
import { CardHeader } from "@/app/(billing)/subscriptions/_component/Header";
import { UsageSummary } from "@/app/(billing)/subscriptions/_component/Usages";
import { CustomerSummary } from "./CustomerSummary";
import { CustomFields } from "./CustomFields";
import { CustomerConfigurations } from "./CustomerConfigurations";
import PaymentInfo from "./PaymentInfo";
import { useCustomerStore } from "../../_store/customers-store";
import BillingaddressInfo from "./BillinAddressInfo";
import { ActivityLogs } from "./ActivityLogs";
import SubscriptionsOverview from "./SubscriptionsOverview";

type Props = {
  columns: boolean;
  onClickView: (view: string) => void;
};

export const CustomerFullpage = ({ columns, onClickView }: Props) => {
  const { getCustomerById } = useCustomerStore();
  const [customerData, setCustomerData] = useState<any>({});
  const [customerId, setCustomerId] = useState<string>("");
  useEffect(() => {
    const url = window.location.pathname;
    const customerId = url.substring(url.lastIndexOf("/") + 1);
    setCustomerId(customerId);
  }, []);
  useEffect(() => {
    setCustomerData(getCustomerById(customerId));
  }, [customerId]);
  const SelectedAutocollectionChoice = autoCollectionOptions["uc6_a1"];
  const SubscriptionConfigData = [
    {
      label: "Auto Collection",
      value: SelectedAutocollectionChoice,
    },
    {
      label: "JASON Metadata",
      value: (
        <div>
          <div>
            No JSON Meta configured. Additional information about this
            subscription in JSON format.
          </div>
          <div>
            <a className="text-primary-600 font-medium cursor-pointer hover:underline">
              Add
            </a>
          </div>
        </div>
      ),
    },
  ];
  const SubscriptionSummaryData = [
    {
      label: "Channel Web",
    },
    {
      label: "cbdemo_pf_crm",
    },
    {
      label: "Subscription ID cbdemo_active_sub",
    },
    {
      label: "INR",
    },
    {
      label: "Billed Yearly",
    },
    {
      label: "Coupon 10% Off (Forever)",
    },
  ];
  const halfLengthCustomerDetails = Math.ceil(CustomerInfoData.length / 2);
  const firstHalfCustomerDetails = CustomerInfoData.slice(
    0,
    halfLengthCustomerDetails
  );
  const secondHalfCustomerDetails = CustomerInfoData.slice(
    halfLengthCustomerDetails
  );
  const halfLengthSubscriptionConfig = Math.ceil(
    SubscriptionConfigData.length / 2
  );
  const firstHalfSubscriptionConfig = SubscriptionConfigData.slice(
    0,
    halfLengthSubscriptionConfig
  );
  const secondHalfSubscriptionConfig = SubscriptionConfigData.slice(
    halfLengthSubscriptionConfig
  );

  return (
    <>
      <div className="space-y-4 pb-16">
        {/* Customer summary */}
        <div>
          <CustomerSummary customerData={customerData} />
        </div>
        {/* CustomFields summary */}
        {/* <div>
          <CustomFields />
        </div> */}
        {/* Customer Configuration */}
        {customerData && <CustomerConfigurations customerData={customerData} />}

        {/* Customer subscriptions */}
        {customerData && <SubscriptionsOverview customerId={customerId} />}

        {/* Customer Billing address */}
        {customerData?.billingAddress && (
          <BillingaddressInfo billingAddresses={customerData.billingAddress} />
        )}
        {/* Customer Payment methods */}
        {customerData?.paymentMethods && (
          <PaymentInfo paymentMethods={customerData.paymentMethods} />
        )}
        {/* Customer activitylogs */}

        <ActivityLogs />
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

export const SummaryTable = () => {
  return (
    <>
      <div>
        <table className="table mt-0">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-row-header-cell ">Item </th>
              <th className="table-row-header-cell  whitespace-nowrap">
                Item Name
              </th>
              <th className="table-row-header-cell ">Units </th>
              <th className="table-row-header-cell ">Unit Price </th>
              <th className="table-row-header-cell ">Value </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="table-row">
              <td className="">Plans</td>
              <td className="">
                <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                  Standard INR Yearly{" "}
                </a>
                (Billed yearly)
              </td>
              <td className="">1</td>
              <td className="">$7,500.00</td>
              <td className="">$7,500.00</td>
            </tr>
            <tr className="table-row">
              <td className="">Addons</td>
              <td className="">
                <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                  Post Payment Actions INR Yearly{" "}
                </a>
                (Billed yearly)
              </td>
              <td className="">1</td>
              <td className="">$7,500.00</td>
              <td className="">$7,500.00</td>
            </tr>
            <tr className="table-row">
              <td className="">Coupons</td>
              <td className="">
                <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                  Special Offer{" "}
                </a>
                (cbdemo_specialoffer applied)
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
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className="">10% Off Forever</td>
            </tr>
          </tbody>
        </table>
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

const SubscriptionSummary = ({ data }: { data: SubscriptionDetail[] }) => {
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

export const InvoiceNote = () => {
  return (
    <>
      <div className="space-y-4">
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

export const ShippingAddress = () => {
  return (
    <>
      <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
        <div className="self-center text-center w-full">
          <Button variant={"neutral"} styleType={"text"}>
            <PlusIcon /> Add shipping address
          </Button>
          <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
            to which you&apos;d like to ship products.
          </div>
        </div>
      </div>
    </>
  );
};
type SubscriptionDetail = {
  label: string;
  value: string | React.ReactNode;
};

export const CustomerDetails = ({ data }: { data: SubscriptionDetail[] }) => {
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
