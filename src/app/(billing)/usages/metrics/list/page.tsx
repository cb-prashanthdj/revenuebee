"use client";

import {
  EllipsisVerticalIcon,
  PlusIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { SHeader, Button, OverFlowMenu, Badge } from "cb-sting-react-ts";
import Link from "next/link";
import React from "react";

const UsageMetricPage = () => {
  const quickActions = [
    {
      label: "Edit",
      value: "Edit",
      action: () => {
        console.log("Edit");
      },
    },
    {
      label: "Duplicate",
      value: "Duplicate",
      action: () => {
        console.log("Duplicate");
      },
    },
    {
      label: "Archieve",
      value: "Archieve",
      action: () => {
        console.log("Archieve");
      },
    },
    {
      label: "Delete",
      value: "Delete",
      customclass: "!text-red-500",
      action: () => {
        console.log("Delete");
      },
    },
  ];
  const getActions = (status) => {
    let filteredActions = [];
    console.log(status);
    switch (status) {
      case "active":
        filteredActions = quickActions.filter((item) =>
          ["Edit", "Duplicate", "Archieve", "Delete"].includes(item.value)
        );
        break;
      case "draft":
        filteredActions = quickActions.filter((item) =>
          ["Edit", "Duplicate", "Archieve", "Delete"].includes(item.value)
        );
        break;
      case "disabled":
        filteredActions = quickActions.filter((item) =>
          ["Edit", "Duplicate", "Archieve", "Delete"].includes(item.value)
        );
        break;
      default:
        filteredActions = quickActions;
    }
    console.log(filteredActions);
    return filteredActions;
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
              <Link href={"/usages/metrics/list"} className="font-semibold">
                Metered Features
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
  return (
    <div>
      <div className="p-xxlarge">
        <SHeader
          actionElements={
            <Link href="/usages/metrics/create" passHref>
              <Button variant="primary" size="regular" onClick={() => {}}>
                <PlusIcon className="size-4" /> Create Metered Feature
              </Button>
            </Link>
          }
          title="Metered feature"
          type="page"
        />
        {/* <PageHeader title='Metered Features' rightActions={<Link href={'/usages/metrics/create'}  ><Button size="regular" variant="neutral"> <PlusIcon className='size-4' />  Create Metered Feature </Button></Link>} /> */}
        <div>
          <div className="flex gap-large py-4 justify-between">
            <div className="flex w-auto">
              <Button styleType="outline" size="regular" variant="neutral">
                <AdjustmentsVerticalIcon className="size-4" /> Filter
              </Button>
            </div>
            <div className="flex w-auto"></div>
            <Button styleType="text" size="regular" variant="neutral">
              <MagnifyingGlassIcon className="size-4" /> Find
            </Button>
          </div>
          <table className="table mt-0">
            <thead className="table-header">
              <tr className="table-row font-semibold">
                <th className="w-0">Metric name</th>
                <th className="table-row-header-cell w-0 whitespace-nowrap">
                  Associated Pricing
                </th>
                <th className="table-row-header-cell w-0 whitespace-nowrap">
                  Description
                </th>
                <th className="w-0"></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {/* <tr className="table-row">
                <td className="w-0 whitespace-nowrap text-lightest">
                  <Link
                    href={"/usages/metrics/details/dashboard"}
                    passHref
                    className="font-semibold text-primary-500 hover:underline"
                  >
                    AI Agent Resolution
                  </Link>{" "}
                  <Badge rounded="small" variant={"success"}>
                    Active
                  </Badge>
                </td>
                <td className="w-0 whitespace-nowrap text-lightest ">
                  <Button
                    styleType="text"
                    size="regular"
                    variant="primary"
                    className="ml-1"
                  >
                    5
                  </Button>
                </td>
                <td className="w-0 whitespace-nowrap text-lightest">
                  Sum of Output tokens for AI Agent Resolution
                </td>
                <td className="w-0 whitespace-nowrap text-lightest">
                  <OverFlowMenu
                    launchIcon={<EllipsisVerticalIcon />}
                    menuGroups={[
                      {
                        items: getActions("active"),
                        title: "Customer Quick Actions",
                      },
                    ]}
                    position="left"
                    variant="om-basic"
                  />
                </td>
              </tr> */}

              <tr className="table-row">
                <td className="w-0 whitespace-nowrap text-lightest">
                  <Link
                    href={"/usages/metrics/details/dashboard"}
                    passHref
                    className="font-semibold text-primary-500 hover:underline"
                  >
                    AI Agent Conversations
                  </Link>{" "}
                  <Badge rounded="small" variant={"success"}>
                    Active
                  </Badge>
                </td>
                <td className="w-0 whitespace-nowrap text-lightest">
                  <Link
                    href={"/usages/metrics/link-to-pricing/choose"}
                    passHref
                    className="font-semibold text-primary-500 hover:underline"
                  >
                    <Button styleType="text" size="regular" variant="primary">
                      <PlusIcon className="size-4" /> Link Pricing
                    </Button>
                  </Link>
                </td>
                <td className="w-0 whitespace-nowrap text-lightest">
                  Sum of all AI Agent conversations
                </td>
                <td className="w-0 whitespace-nowrap text-lightest">
                  <OverFlowMenu
                    launchIcon={<EllipsisVerticalIcon />}
                    menuGroups={[
                      {
                        items: getActions("active"),
                        title: "Customer Quick Actions",
                      },
                    ]}
                    position="left"
                    variant="om-basic"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsageMetricPage;
