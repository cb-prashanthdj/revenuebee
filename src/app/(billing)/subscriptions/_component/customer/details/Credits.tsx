"use client";

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
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Button,
  // PlusIcon,
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
} from "cb-sting-react-ts";
import { CardHeader } from "../../Header";
import React from "react";

type Props = {};

export const Credits = ({}: Props) => {
  const halfLengthCustomerDetails = Math.ceil(CustomerInfoData.length / 2);
  const firstHalfCustomerDetails = CustomerInfoData.slice(
    0,
    halfLengthCustomerDetails
  );
  const secondHalfCustomerDetails = CustomerInfoData.slice(
    halfLengthCustomerDetails
  );

  return (
    <>
      <div className="space-y-4 pb-16">
        {/* Hero */}
        <div>
          <Card>
            <div className="space-y-4">
              <div className="md:flex gap-8 items-start justify-between pb-4 space-y-4 md:space-y-0">
                <h1 className="h3">Credit Note for $20.00</h1>
                <div className="flex gap-6 items-center">
                  <div className="flex gap-4 whitespace-nowrap">
                    <Badge variant="green" size="large">
                      Refunded 26 days ago
                    </Badge>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant={"neutral"}
                      styleType={"default"}
                      size={"regular"}
                    >
                      <PaperAirplaneIcon /> Email
                    </Button>
                    <Button
                      variant={"neutral"}
                      styleType={"default"}
                      size={"regular"}
                    >
                      <ArrowDownTrayIcon /> PDF
                    </Button>
                  </div>
                </div>
              </div>

              {/* invoice data */}
              <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
                <div className="w-full xl:w-1/2">
                  <CustomerDetails data={firstHalfCustomerDetails} />
                </div>
                <div className="w-full xl:w-1/2">
                  <CustomerDetails data={secondHalfCustomerDetails} />
                </div>
              </div>

              {/* Invoice values */}
              <div className="pt-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-neutral-25 border-b font-semibold text-neutral-700 text-left">
                        Items
                      </th>
                      <th className="px-4 py-2 bg-neutral-25 border-b font-semibold text-neutral-700 text-right whitespace-nowrap">
                        Amount (USD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2.5 border-b-4 border-neutral-50">
                        <span className="whitespace-no-wrap">
                          <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                            Advanced
                          </a>{" "}
                          - Mar 13 - Mar 13, 2024
                        </span>
                      </td>
                      <td className="px-4 py-2.5 border-b-4 border-neutral-50 text-right">
                        <span className="whitespace-no-wrap">$20.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 border-b text-right font-semibold w-full">
                        Total
                      </td>
                      <td className="px-4 py-2.5 border-b text-right">
                        <span className="font-semibold whitespace-no-wrap">
                          $20.00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 border-b text-right font-semibold w-full">
                        Allocations
                      </td>
                      <td className="px-4 py-2.5 border-b text-right">
                        <span className="font-semibold whitespace-no-wrap">
                          $20.00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-right font-semibold w-full">
                        Amount Available
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xl font-semibold text-green-500 whitespace-no-wrap">
                          $20.00
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

const CustomerInfoData = [
  {
    label: "ID",
    value: "EST-CN-48",
  },
  {
    label: "Date",
    value: "13 Mar 2024 17:26 Pacific/Fiji",
  },
  {
    label: "Amount Available",
    value: "0",
  },
  {
    label: "Reason",
    value: "Order Change",
  },
  // {
  //   label: "Channel",
  //   value: "Web",
  // },
];

type BillingDetail = {
  label: string;
  value: string | React.ReactNode;
};

export const CustomerDetails = ({ data }: { data: BillingDetail[] }) => {
  return (
    <ContainedList labels="block" padding="regular" variant="basic">
      <ContainedListItems>
        {data.map((detail) => (
          <ContainedListItem key={detail.label}>
            <ContainedListLabel>{detail.label}</ContainedListLabel>
            <ContainedListValue>{detail.value}</ContainedListValue>
          </ContainedListItem>
        ))}
      </ContainedListItems>
    </ContainedList>
  );
};

export default Credits;
