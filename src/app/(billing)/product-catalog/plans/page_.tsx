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
      xl: 1
    }}
    gap={{
      default: '0px',
      lg: 'regular',
      md: '0px',
      sm: '0px',
      xl: '0px'
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
    <Column
      className="s-p-large space-y-xlarge"
     
    >
      <div className=" w-1/2">
        <Notification close icon size="regular" variant="info" width="inline">
          <div className=" space-y-3 flex flex-col">
            
            <span className="notification-title font-semibold text-xl">
              Offline Payment Methods
            </span>
            <span className=" leading-normal">
              Allow Customer to make payments using offline payment methods such
              as cash, cheque, and ACH Credit, SEPA Credit and more, in
              Checkout. Offline methods payment make payments accessible and
              easier for customers.
            </span>
           
          </div>
        </Notification>
      </div>

      {/* header */}
      <div className="lg:flex lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="-mt-2">
          <div className="flex items-center gap-4 divide-x">
            <h2 className="h2 leading-none">Plans</h2>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="neutral">Import Plans</Button>
          <Link href="/billing/product-catalog/plans/create" ><Button variant="primary">Create Plan</Button></Link>
        </div>
      </div>
      {/* header */}

      <div className="lg:flex lg:gap-8 space-y-8 lg:space-y-0">
        {/* Left Col */}
        {/* <div className="bg-neutral-50 lg:w-80 2xl:w-96">
          <div className="block-placeholder h-16 lg:h-64"></div>
        </div> */}

        {/* Content Col */}
        {/* <div className="bg-neutral-50 w-full">
          <div className="block-placeholder h-64"></div>
        </div> */}

        {/* Right Col */}
        {/* <div className="bg-neutral-50 lg:block lg:w-80 2xl:w-96">
          <div className="block-placeholder h-64"></div>
        </div> */}

        <Card>
          <div className="flex gap-2 items-center">
            <h4>Growth Plan</h4>
            <Badge variant="green" size="large">
              Active
            </Badge>
            <span className="text-gray-500">
              Last modified 07-Mar-2024 05:21
            </span>
            <div className="ml-auto flex gap-2">
              <Button variant="neutral">Edit</Button>
              <Button variant="neutral">Archive</Button>
            </div>
          </div>
          <div className="xl:flex w-full xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
            <div className="w-full xl:w-1/2">
              <ContainedList
                labels="block"
                variant="basic"
                showHeader
                showTitle
              >
                <ContainedListItems>
                  <ContainedListItem>
                    <ContainedListLabel>ID</ContainedListLabel>
                    <ContainedListValue>Growth-Plan</ContainedListValue>
                  </ContainedListItem>
                  <ContainedListItem>
                    <ContainedListLabel>Display in Checkout</ContainedListLabel>
                    <ContainedListValue>Yes</ContainedListValue>
                  </ContainedListItem>
                  <ContainedListItem>
                    <ContainedListLabel>
                      Display in Self-Serve Portal
                    </ContainedListLabel>
                    <ContainedListValue>Yes</ContainedListValue>
                  </ContainedListItem>
                  <ContainedListItem>
                    <ContainedListLabel>JSON Metadata</ContainedListLabel>
                    <ContainedListValue>
                      <div className="text-base font-medium text-blue-600 cursor-pointer">
                        Add
                      </div>
                    </ContainedListValue>
                  </ContainedListItem>
                </ContainedListItems>
              </ContainedList>
            </div>
            <div className="w-full xl:w-1/2">
              <ContainedList
                labels="block"
                variant="basic"
                showHeader
                showTitle
              >
                <ContainedListItems>
                  <ContainedListItem>
                    <ContainedListLabel>Last Modified</ContainedListLabel>
                    <ContainedListValue>07-Mar-2024 05:21</ContainedListValue>
                  </ContainedListItem>
                  <ContainedListItem>
                    <ContainedListLabel>Channel</ContainedListLabel>
                    <ContainedListValue>Web</ContainedListValue>
                  </ContainedListItem>
                  <ContainedListItem>
                    <ContainedListLabel>Metered</ContainedListLabel>
                    <ContainedListValue>No</ContainedListValue>
                  </ContainedListItem>
                  <ContainedListItem>
                    <ContainedListLabel>Is shippable</ContainedListLabel>
                    <ContainedListValue>No</ContainedListValue>
                  </ContainedListItem>
                </ContainedListItems>
              </ContainedList>
            </div>
          </div>
        </Card>
      </div>

      <TableRoot>
        <TableHeader>
          <TableRow>
            {renderTableHeaders()}
            {plansJSON.length > 0 ? (
              <th className="w-0"></th>
            ) : (
              <th className="w-0" colSpan={7}>
                No Data
              </th>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRowData data={plansJSON} />
        </TableBody>
      </TableRoot>
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

const TableRowData = ({ data }: {data: any[]}) => {
  const router = useRouter();
  const cellConfig = [
    {
      key: "currency",
      render: (value:any, row: { pendingApproval: boolean}) => (
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
