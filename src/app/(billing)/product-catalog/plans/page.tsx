"use client";

import {
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { camelCaseToHumanText } from "@/app/lib/utils";
import { EntitlementsTable } from "../_components/EntitlementsTable";
import { CardHeader } from "../_components/Header";

import {
  DocumentTextIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Button,
  Card,
  Column,
  ContainedList,
  ContainedListItem,
  ContainedListItems,
  ContainedListLabel,
  ContainedListValue,
  Grid,
  Notification,
  OverFlowMenu,
  TabNav,
  TabNavLink,
  SHeader,
} from "cb-sting-react-ts";
import clsx from "clsx";
import React, { useState } from "react";

import plansJSON from "./tableData.json";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const headerClassNames = {
  currency: "whitespace-nowrap",
  frequency: "whitespace-nowrap",
  pricingModel: "whitespace-nowrap",
  price: "whitespace-nowrap",
  billingCycle: "whitespace-nowrap",
  trial: "whitespace-nowrap",
  preview: "whitespace-nowrap",
};
const Breadcrumbs = () => {
  return (
    <>
      <ol
        role="list"
        className="flex pl-0 mb-1 items-center space-x-4 list-none"
      >
        <li>
          <div className="flex items-center">
            <Link href={"/product-catalog/plans"} className="">
              All Plans
            </Link>
            <svg
              className="size-4  text-neutral-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Link href={"/product-catalog/plans"} className="">
              Intercom Essential
            </Link>
            <svg
              className="size-4  text-neutral-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
      </ol>
    </>
  );
};
const customPriceCell = (inputText: string): React.ReactNode => {
  const parts = inputText.split(" ");
  const amount = parts[0];
  const currencySymbol = parts[1];
  const currencyCode = parts[2];

  if (parts.length > 2) {
    return (
      <>
        <span className="font-semibold">
          {amount} {currencySymbol}
        </span>{" "}
        {currencyCode}
      </>
    );
  } else {
    return (
      <a href="#" className="font-semibold">
        Set Price
      </a>
    );
  }
};

const renderTableHeaders = () => {
  return Object.keys(headerClassNames).map((header, index) => {
    const headerKey = header as keyof typeof headerClassNames;
    const isValidHeader = headerKey in headerClassNames;
    if (isValidHeader) {
      return (
        <TableHeaderCell key={index} customClass={headerClassNames[headerKey]}>
          <span className="flex gap-1 items-center">
            {camelCaseToHumanText(headerKey)}{" "}
            {headerKey === "preview" ? (
              <button>
                <InformationCircleIcon className="w-4" />
              </button>
            ) : (
              <button>
                <FilterIcon />
              </button>
            )}
          </span>
        </TableHeaderCell>
      );
    }
    return null;
  });
};

const PlanPage = (props: Props) => {
  return (
    <div className=" pt-large">
      <Grid
        cols={{
          default: 3,
          lg: 12,
          md: 1,
          sm: 1,
          xl: 1,
        }}
        gap={{
          default: "0px",
          lg: "regular",
          md: "0px",
          sm: "0px",
          xl: "0px",
        }}
      >
        {/* <Column
      className="s-p-large "
      span={2}
    >

<div className="space-y-large ">
<h1 className='h6'>Product Catalog:</h1>
      <TabNav>
        <TabNavLink active><span>Plans</span></TabNavLink>
        <TabNavLink><span>Addons</span></TabNavLink>
        <TabNavLink><span>Coupons</span></TabNavLink>
        <TabNavLink><span>Coupons Set</span></TabNavLink>
   
                 
               </TabNav> 
</div>
    </Column> */}
        <Column className="s-p-large space-y-xlarge">
          <div className="lg:flex lg:gap-8 space-y-8 lg:space-y-0">
            <Card>
              <SHeader
                actionElements={
                  <>
                    <Button
                      styleType="outline"
                      variant="neutral"
                      size="regular"
                      onClick={() => {}}
                    >
                      Edit
                    </Button>
                    <Button size="regular" variant="neutral" onClick={() => {}}>
                      Archive
                    </Button>
                  </>
                }
                backAction={
                  <div className="px-2">
                    <Breadcrumbs />
                  </div>
                }
                title={
                  <div className="flex items-center">
                    Intercom Essential
                    <Badge
                      className="ml-2 font-normal tracking-wide"
                      rounded="small"
                      variant={"success"}
                    >
                      ACTIVE
                    </Badge>
                  </div>
                }
                description="Uncover hidden insights and carry out deeper analytics for your enterprise with this Intercom Essential plan."
                type="page"
              />

              <div className="w-full flex flex-wrap mx-auto bg-white ">
                {/* ID */}
                <div className="w-1/4 flex flex-col  pb-4 mb-4">
                  <div className="text-gray-600">ID</div>
                  <div className="font-medium text-gray-900">
                    cbdemo_advanced
                  </div>
                </div>

                {/* Display in Checkout */}
                <div className="w-1/4 flex flex-col  pb-4 mb-4">
                  <div className="text-gray-600">Display in Checkout</div>
                  <div className="font-medium text-gray-900">Yes</div>
                </div>

                {/* Display in Self-Serve Portal */}
                <div className="w-1/4 flex flex-col  pb-4 mb-4">
                  <div className="text-gray-600">
                    Display in Self-Serve Portal
                  </div>
                  <div className="font-medium text-gray-900">Yes</div>
                </div>

                {/* JSON Metadata */}
                <div className="w-1/4 flex flex-col  pb-4 mb-4">
                  <div className="text-gray-600">JSON Metadata</div>
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Add
                  </a>
                </div>

                {/* Last Modified */}
                <div className="w-1/4 flex flex-col  pb-4 mb-4">
                  <div className="text-gray-600">Last Modified</div>
                  <div className="font-medium text-gray-900">
                    07-May-2024 16:08
                  </div>
                </div>

                {/* Channel */}
                <div className="w-1/4 flex flex-col">
                  <div className="text-gray-600">Channel</div>
                  <div className="font-medium text-gray-900">Web</div>
                </div>
              </div>
            </Card>
          </div>
          {/* Entitlements summary */}
          <div>
            <Card>
              <CardHeader title="Entitlements"></CardHeader>
              <div>
                <EntitlementsTable />
              </div>
            </Card>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

// Table code

const PreviewIcons = () => (
  <div className="flex gap-1">
    <button>
      <EyeIcon className="w-4" />
    </button>
    <button>
      <DocumentTextIcon className="w-4" />
    </button>
    <button>
      <LinkIcon className="w-4" />
    </button>
  </div>
);

const TableRowData = ({ data }: { data: any[] }) => {
  const router = useRouter();
  const cellConfig = [
    {
      key: "currency",
      render: (value: any, row: { pendingApproval: boolean }) => (
        <div className="flex gap-1 items-center">
          {value}
          {row.pendingApproval && (
            <Badge variant="yellow">Pending Approval</Badge>
          )}
        </div>
      ),
    },
    { key: "frequency" },
    { key: "pricingModel" },
    { key: "price", render: customPriceCell },
    { key: "billingCycle" },
    { key: "trial" },
    {
      key: "preview",
      render: (_: any, row: { [key: string]: any }) =>
        Object.keys(headerClassNames)
          .filter((value) => value !== "preview")
          .every((value) => Boolean(row[value])) && <PreviewIcons />,
    },
    {
      key: "actions",
      render: () => (
        <OverFlowMenu
          launchIcon={<EllipsisVerticalIcon />}
          menuGroups={[{ items: quickActions, title: "Quick Actions" }]}
          position="left"
          align="start"
          variant="om-basic"
        />
      ),
    },
  ];

  const quickActions = [
    {
      action: () => {
        router.push("/product-catalog/plans/edit");
      },
      label: "Edit",
      value: "Edit",
    },
    {
      action: () => {},
      label: "Delete",
      value: "Delete",
    },
  ];

  return data.map((row, index) => (
    <tr
      key={index}
      className={clsx({ "cursor-pointer": row?.pendingApproval })}
    >
      {cellConfig.map(({ key, render }) => (
        <TableCell
          key={key}
          customClass={clsx({
            "item-actions": key === "actions",
          })}
        >
          {render ? render(row[key], row) : row[key] || ""}
        </TableCell>
      ))}
    </tr>
  ));
};
const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-gray-400"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
};

export default PlanPage;
