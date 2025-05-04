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
  Notification,
} from "cb-sting-react-ts";
// import { CardHeader } from "../../ui/Header";
import React from "react";

type Props = {};

export const Quotes = ({}: Props) => {
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
                {/* <div className="pb-4">
                <Notification
                  action
                  icon
                  size="regular"
                  variant="primary"
                >
                  <span className="notification-copy">
                    Approval request status
                  </span>
                </Notification>
              </div> */}
              <div className="md:flex gap-8 items-start justify-between pb-4 space-y-4 md:space-y-0">
                <h1 className="h3">
                  Quote title testing the lenght behaviour when it&apos;s very
                  very but very long
                </h1>
                <div className="sm:flex gap-6 items-center space-y-4 sm:space-y-0">
                  <div className="flex gap-4">
                    <Badge variant="red" size="large">
                      Expired
                    </Badge>
                    <Badge variant="info" size="large">
                      Closed
                    </Badge>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant={"neutral"}
                      styleType={"default"}
                      size={"regular"}
                    >
                      <ArrowDownTrayIcon /> PDF
                    </Button>
                    <Button
                      variant={"danger"}
                      styleType={"outline"}
                      size={"regular"}
                    >
                      <TrashIcon /> Delete
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

              {/*  */}
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex flex-col justify-between bg-neutral-25 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold text-neutral-700">
                        SR 605.97
                      </span>
                      <span>Chargeable on acceptance</span>
                    </div>
                  </div>

                  <div className="flex justify-between bg-neutral-25 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold text-neutral-700">
                        SR 605.97
                      </span>
                      <span>Total payable - Includes discounts and taxes</span>
                    </div>
                  </div>
                </div>
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
    value: "#AKMQ5",
  },
  {
    label: "Version",
    value: "1",
  },
  {
    label: "Label",
    value: "iPhone",
  },
  {
    label: "Created",
    value: "13 Mar 2024 17:24",
  },
  {
    label: "Expiry date",
    value: "22 Mar 2024 23:59",
  },
  {
    label: "Next Billing Date",
    value: "09 Apr 2024 00:02 Pacific/Fiji",
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

export default Quotes;
