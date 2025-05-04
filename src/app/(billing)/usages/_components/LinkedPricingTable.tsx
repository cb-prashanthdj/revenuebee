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
export const LinkedPricingTable = () => {
  return (
    <>
      <Table mode="light" border="round" className="">
        <Table.Tr>
          <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] ">
            Plan
          </Table.Td>
          <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] ">
            Pricing
          </Table.Td>
          <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] ">
            Included usage
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              Essential
            </Button>
          </Table.Td>
          <Table.Td>$49 USD</Table.Td>
          <Table.Td>200 conversations</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Button variant={"primary"} styleType={"text"} size={"regular"}>
              Additional AI agent conversations
            </Button>
          </Table.Td>
          <Table.Td>$0.2 USD</Table.Td>
          <Table.Td>Unlimited - Usage based</Table.Td>
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
