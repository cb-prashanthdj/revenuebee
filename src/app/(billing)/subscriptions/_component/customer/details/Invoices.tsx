"use client";

import {
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
// import { SendIcon } from "../../Icons";
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
// import { CardHeader } from "../../ui/Header";
import React from "react";

type Props = {};

export const Invoices = ({}: Props) => {
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
                <h1 className="h3">Invoice for $800.00</h1>
                <div className="sm:flex gap-6 items-center space-y-4 sm:space-y-0">
                  <div className="flex gap-4">
                    <Badge variant="green" size="large">
                      Paid Today
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
                      <th className="px-4 py-2 bg-neutral-25 border-b font-semibold text-neutral-700 text-right">
                        Units
                      </th>
                      <th className="px-4 py-2 bg-neutral-25 border-b font-semibold text-neutral-700 text-right">
                        Unit Price
                      </th>
                      <th className="px-4 py-2 bg-neutral-25 border-b font-semibold text-neutral-700 text-right">
                        Amount (USD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2.5 border-b-4 border-neutral-50">
                        <span className="whitespace-no-wrap">
                          <a className="text-primary-600 font-medium cursor-pointer hover:underline">
                            Additional Units Per unit
                          </a>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 border-b-4 border-neutral-50 text-right">
                        <span className="whitespace-no-wrap">10</span>
                      </td>
                      <td className="px-4 py-2.5 border-b-4 border-neutral-50 text-right">
                        <span className="whitespace-no-wrap">$80.00</span>
                      </td>
                      <td className="px-4 py-2.5 border-b-4 border-neutral-50 text-right">
                        <span className="whitespace-no-wrap">$800.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-2.5 border-b text-right font-semibold"
                      >
                        Total
                      </td>
                      <td className="px-4 py-2.5 border-b text-right">
                        <span className="font-semibold whitespace-no-wrap">
                          $800.00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-3 text-right font-semibold"
                      >
                        Amount Paid
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xl font-semibold text-green-500 whitespace-no-wrap">
                          $800.00
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
    value: "09042024563",
  },
  {
    label: "Name",
    value: "Mike Douglas",
  },
  {
    label: "Invoiced On",
    value: "09 Apr 2024 00:02 Pacific/Fiji",
  },
  {
    label: "Amount Due",
    value: "0",
  },
  {
    label: "Billing Period",
    value: "Apr 09 - Apr 15, 2024",
  },
  {
    label: "Next Billing Date",
    value: "09 Apr 2024 00:02 Pacific/Fiji",
  },
  {
    label: "Channel",
    value: "Web",
  },
  {
    label: "Due Date",
    value: "09 Apr 2024 00:02 Pacific/Fiji",
  },
  {
    label: "Payment Terms",
    value: "Due Upon Receipt",
  },
  {
    label: "AK_Tag",
    value: "RTM",
  },
  {
    label: "Time to deadline",
    value: "14 Dec 2023 00:00",
  },
  {
    label: "ARR Value of Customer",
    value: "10M to 30M",
  },
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

export default Invoices;
