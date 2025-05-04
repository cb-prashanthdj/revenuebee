"use client";

import {
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
  UserIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Card, Button } from "cb-sting-react-ts";
import React from "react";
import Link from "next/link";
import { CardHeader } from "../../Header";
import { ContainedList, ContainedListItem } from "cb-sting-react-ts";
type Props = {};

export const BasicInfoB = ({}: Props) => {
  const halfLength = Math.ceil(CustomerInfoDetails.length / 2);
  const firstHalfDetails = CustomerInfoDetails.slice(0, halfLength);
  const secondHalfDetails = CustomerInfoDetails.slice(halfLength);
  return (
    <>
      <div className="bg-white border border-neutral-50 border-b-neutral-100 rounded-md w-full divide-x flex justify-between">
        <StatBox title="Total Amount Due" value={"$3,700"} qoute={""} />
        <StatBox
          title="Upcoming Payment"
          value={"$3,900"}
          qoute={""}
          titleIcon={
            <InformationCircleIcon className="h-4 w-4 text-gray-400" />
          }
        />
        <StatBox title="Unbilled Charges" value={"$0"} qoute={""} />
        <StatBox title="Refundable Credits" value={"$30"} qoute={""} />
        <StatBox title="Excess Payments" value={"$0"} qoute={""} />
      </div>

      <div className="grid grid-cols-12 gap-4 py-4">
        <div className="col-span-12">
          <Card className="">
            <CardHeader title="Profile">
              <Button variant={"neutral"} styleType={"text"} size={"regular"}>
                <PencilIcon /> Edit
              </Button>
            </CardHeader>
            <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
              <div className="w-full xl:w-1/2">
                <CustomerInfo2 data={firstHalfDetails} />
              </div>
              <div className="w-full xl:w-1/2">
                <CustomerInfo2 data={secondHalfDetails} />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <Card>
            <div className=" ">
              <BillingAddress />
            </div>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <div className="flex items-center border border-dashed border-neutral-100 rounded h-full">
            <AdditionalContact />
          </div>
        </div>
      </div>
    </>
  );
};

type StatBoxProps = {
  title: string;
  titleIcon?: React.ReactNode;
  value: string;
  qoute: string;
};

const StatBox = ({ title, titleIcon, value, qoute }: StatBoxProps) => {
  return (
    <div className="px-4 pt-2.5 pb-2 w-1/5">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-x-2 text-sm lg:text-base text-neutral-500 leading-4">
          {title} {titleIcon && <span className="title-icon">{titleIcon}</span>}
        </div>
        <div className="flex items-center gap-x-1 leading-none">
          <div className="h5 lg:h4">{value}</div>
          <div className="text-sm lg:text-base">{qoute}</div>
        </div>
      </div>
    </div>
  );
};

const CustomerInfoDetails = [
  {
    label: "First Name",
    value: "Douglas",
  },
  {
    label: "Last Name",
    value: "Quaid",
  },
  {
    label: "ID",
    value: "cb_mercedes",
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
    label: "Next billing date",
    value: "Nov 30 2023 11:51",
  },
  {
    label: "Lead Channel",
    value: "Web",
  },
  {
    label: "Preferred Currency",
    value: "USD",
  },
  {
    label: "Auto Collection",
    value: "On",
  },
  {
    label: "Closure of Invoice",
    value: "Site default",
  },
  {
    label: "Direct Debit",
    value: "Enabled",
  },
  {
    label: "Invoice Note",
    value: (
      <Button variant={"neutral"} styleType={"text"} size={"small"}>
        <PlusIcon /> Add
      </Button>
    ),
  },
  {
    label: "JSON Metadata",
    value: (
      <Button
        variant={"neutral"}
        styleType={"text"}
        size={"small"}
        onClick={() => {}}
      >
        <PlusIcon /> Add
      </Button>
    ),
  },
];
type BillingDetail = {
  label: string;
  value: string | React.ReactNode;
};

export const CustomerInfo2 = ({ data }: { data: BillingDetail[] }) => {
  return (
    <ContainedList
      description=""
      header=""
      align="left"
      onClick={() => {}}
      padding="large"
      variant="basic"
      labels="block"
    >
      {data.map((detail) => (
        <ContainedListItem
          key={detail.label}
          label={detail.label}
          value={detail.value}
        />
      ))}
    </ContainedList>
  );
};

export const BillingAddress = () => {
  return (
    <>
      <CardHeader title="Billing Contact">
        <Button variant={"neutral"} size={"regular"} styleType={"text"}>
          <PencilIcon />
        </Button>
      </CardHeader>
      <div className="space-y-1 divide-y divide-neutral-50">
        <div className="flex gap-4 items-center pb-1">
          <UserIcon className="h-4 w-4 text-neutral-400" />
          <span className="text-base font-semibold">Harish Vaidyanathan</span>
        </div>
        <div className="flex gap-4 items-center pt-2 pb-1">
          <span className="h-4 w-4">
            <EnvelopeIcon className="h-4 w-4 text-neutral-400" />
          </span>
          <span className="leading-5">
            1945 Berkeley Way, Apt 319 Berkeley 94704 United States
          </span>
        </div>
        <div className="flex gap-2 items-center pt-2 pb-1">
          <PhoneIcon className="h-4 w-4 text-neutral-400" />
          <Button variant={"neutral"} styleType={"text"} size="small">
            +1716 206 9994
          </Button>
        </div>
        <div className="flex gap-2 items-center pt-2 pb-1">
          <EnvelopeIcon className="h-4 w-4 text-neutral-400" />
          <Link href={"#"}>
            <Button
              variant={"neutral"}
              styleType={"text"}
              size="small"
              className="lowercase"
            >
              harish@gmail.com
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const AdditionalContact = () => {
  return (
    <>
      <div>
        <div className="flex gap-x-4 justify-center">
          <Button variant={"neutral"} styleType={"text"}>
            <PlusIcon /> Add Contact
          </Button>
        </div>
        <p className="text-xs text-neutral-500 leading-4 px-12 py-2 text-center">
          Add additional contacts of this customer to send invoices, payment,
          and subscription-related emails.
        </p>
      </div>
    </>
  );
};
