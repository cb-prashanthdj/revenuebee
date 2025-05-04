"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";
import { Table, Button, Badge, Link } from "cb-sting-react-ts";
import UsageCharts from "../events/_components/UsageCharts";
import { TrendBadge } from "@/components/ui/TrendBadge";

const chartDatas = [
  {
    time: "Jan 1",
    events: 1,
    eventStart: "2024-12-06T16:51:00.000Z",
    eventEnd: "2024-12-06T16:52:00.000Z",
  },
  {
    time: "Jan 4",
    events: 2,
    eventStart: "2024-12-06T16:52:00.000Z",
    eventEnd: "2024-12-06T16:54:00.000Z",
  },
  {
    time: "Jan 6",
    events: 1,
    eventStart: "2024-12-06T16:54:00.000Z",
    eventEnd: "2024-12-06T16:56:00.000Z",
  },
  {
    time: "Jan 8",
    events: 1,
    eventStart: "2024-12-06T16:56:00.000Z",
    eventEnd: "2024-12-06T16:58:00.000Z",
  },
  {
    time: "Jan 10",
    events: 3,
    eventStart: "2024-12-06T16:58:00.000Z",
    eventEnd: "2024-12-06T17:00:00.000Z",
  },
  {
    time: "Jan 12",
    events: 3,
    eventStart: "2024-12-06T17:00:00.000Z",
    eventEnd: "2024-12-06T17:02:00.000Z",
  },
  {
    time: "Jan 14",
    events: 0,
    eventStart: "2024-12-06T17:02:00.000Z",
    eventEnd: "2024-12-06T17:04:00.000Z",
  },
  {
    time: "Jan 16",
    events: 3,
    eventStart: "2024-12-06T17:04:00.000Z",
    eventEnd: "2024-12-06T17:05:00.000Z",
  },
  {
    time: "Jan 18",
    events: 1,
    eventStart: "2024-12-06T17:05:00.000Z",
    eventEnd: "2024-12-06T17:07:00.000Z",
  },
  {
    time: "Jan 20",
    events: 3,
    eventStart: "2024-12-06T17:07:00.000Z",
    eventEnd: "2024-12-06T17:09:00.000Z",
  },
  {
    time: "Jan 22",
    events: 4,
    eventStart: "2024-12-06T17:09:00.000Z",
    eventEnd: "2024-12-06T17:11:00.000Z",
  },
  {
    time: "Jan 24",
    events: 0,
    eventStart: "2024-12-06T17:11:00.000Z",
    eventEnd: "2024-12-06T17:13:00.000Z",
  },
  {
    time: "Jan 26",
    events: 3,
    eventStart: "2024-12-06T17:13:00.000Z",
    eventEnd: "2024-12-06T17:15:00.000Z",
  },
  {
    time: "Jan 28",
    events: 2,
    eventStart: "2024-12-06T17:15:00.000Z",
    eventEnd: "2024-12-06T17:17:00.000Z",
  },
  {
    time: "Jan 30",
    events: 0,
    eventStart: "2024-12-06T17:17:00.000Z",
    eventEnd: "2024-12-06T17:19:00.000Z",
  },
];
export const AssociatedItemsTable = () => {
  return (
    <>
      <Table mode="light" border="full" className="border border-neutral-200">
        <Table.Tr>
          <Table.Td className="bg-neutral-50">Item Price Point</Table.Td>
          <Table.Td className="bg-neutral-50">Pricing model</Table.Td>
          <Table.Td className="bg-neutral-50">Pricing</Table.Td>
          <Table.Td className="bg-neutral-50">Usage (tokens)</Table.Td>
          <Table.Td className="bg-neutral-50">Revenue</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              Scale input tokens - Annual
            </Button>
          </Table.Td>
          <Table.Td>Tiered</Table.Td>
          <Table.Td>Starts at $0.1USD</Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              500M
              <TrendBadge variant="up" size="small">
                13.5%
              </TrendBadge>
            </div>
          </Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              $30M
              <TrendBadge variant="up" size="small">
                {" "}
                2.5%
              </TrendBadge>
            </div>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              Scale input tokens - Monthly
            </Button>
          </Table.Td>
          <Table.Td>Tiered</Table.Td>
          <Table.Td>Starts at $0.2USD</Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              400M
              <TrendBadge variant="down" size="small">
                {" "}
                2.5%
              </TrendBadge>
            </div>
          </Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              $25M{" "}
              <TrendBadge variant="down" size="small">
                {" "}
                2.5%
              </TrendBadge>
            </div>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              PAYG Input tokens - Per Unit
            </Button>
          </Table.Td>
          <Table.Td>Per unit</Table.Td>
          <Table.Td>Starts at $0.1USD</Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              200M
              <TrendBadge variant="up" size="small">
                {" "}
                2.5%
              </TrendBadge>
            </div>
          </Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              $50M{" "}
              <TrendBadge variant="up" size="small">
                {" "}
                12.5%
              </TrendBadge>
            </div>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              Enterprise Input Tokens - Annual
            </Button>
          </Table.Td>
          <Table.Td>Tiered</Table.Td>
          <Table.Td>Starts at $0.3USD</Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              400M{" "}
              <TrendBadge variant="up" size="small">
                {" "}
                13.5%
              </TrendBadge>
            </div>
          </Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              $25M{" "}
              <TrendBadge variant="down" size="small">
                {" "}
                12.5%
              </TrendBadge>
            </div>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              Enterprise Input Tokens - Monthly
            </Button>
          </Table.Td>
          <Table.Td>Tiered</Table.Td>
          <Table.Td>Starts at $0.5USD</Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              200M{" "}
              <TrendBadge variant="down" size="small">
                {" "}
                12.5%
              </TrendBadge>
            </div>
          </Table.Td>
          <Table.Td>
            <div className="flex gap-small items-center">
              $18M{" "}
              <TrendBadge variant="up" size="small">
                {" "}
                13.5%
              </TrendBadge>
            </div>
          </Table.Td>
        </Table.Tr>
      </Table>
      <div className="flex gap-4 text-center bg-white !-mt-1 border p-2 rounded-b">
        <Link
          href={""}
          passHref
          className="font-semibold text-primary-500 hover:underline w-full"
        >
          View details <ChevronRightIcon className="size-5 ml-2 inline-block" />{" "}
        </Link>
      </div>
    </>
  );
};
