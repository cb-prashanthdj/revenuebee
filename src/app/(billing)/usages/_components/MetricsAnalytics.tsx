"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Button,
  SHeader,
  SelectMenu,
  SelectItem,
  Link,
} from "cb-sting-react-ts";
import UsageCharts from "../events/_components/UsageCharts";
import {
  format,
  isAfter,
  add,
  addMinutes,
  isBefore,
  parse,
  formatISO,
  differenceInMinutes,
  addHours,
  isEqual,
  isValid,
} from "date-fns";

const chartDatas = [
  {
    time: "Jan 1",
    events: 1,
    eventStart: "2024-01-01T00:00:00.000Z",
    eventEnd: "2024-01-01T00:01:00.000Z",
  },
  {
    time: "Jan 2",
    events: 2,
    eventStart: "2024-01-02T00:00:00.000Z",
    eventEnd: "2024-01-02T00:00:00.000Z",
  },
  {
    time: "Jan 3",
    events: 3,
    eventStart: "2024-01-03T00:00:00.000Z",
    eventEnd: "2024-01-03T00:02:00.000Z",
  },
  {
    time: "Jan 4",
    events: 3,
    eventStart: "2024-01-04T00:00:00.000Z",
    eventEnd: "2024-01-04T00:02:00.000Z",
  },
  {
    time: "Jan 5",
    events: 4,
    eventStart: "2024-01-05T00:00:00.000Z",
    eventEnd: "2024-01-05T00:01:00.000Z",
  },
  {
    time: "Jan 6",
    events: 5,
    eventStart: "2024-01-06T00:00:00.000Z",
    eventEnd: "2024-01-06T00:01:00.000Z",
  },
  {
    time: "Jan 7",
    events: 5,
    eventStart: "2024-01-07T00:00:00.000Z",
    eventEnd: "2024-01-07T00:03:00.000Z",
  },
  {
    time: "Jan 8",
    events: 6,
    eventStart: "2024-01-08T00:00:00.000Z",
    eventEnd: "2024-01-08T00:01:00.000Z",
  },
  {
    time: "Jan 9",
    events: 6,
    eventStart: "2024-01-09T00:00:00.000Z",
    eventEnd: "2024-01-09T00:02:00.000Z",
  },
  {
    time: "Jan 10",
    events: 7,
    eventStart: "2024-01-10T00:00:00.000Z",
    eventEnd: "2024-01-10T00:03:00.000Z",
  },
  {
    time: "Jan 11",
    events: 7,
    eventStart: "2024-01-11T00:00:00.000Z",
    eventEnd: "2024-01-11T00:00:00.000Z",
  },
  {
    time: "Jan 12",
    events: 8,
    eventStart: "2024-01-12T00:00:00.000Z",
    eventEnd: "2024-01-12T00:03:00.000Z",
  },
  {
    time: "Jan 13",
    events: 8,
    eventStart: "2024-01-13T00:00:00.000Z",
    eventEnd: "2024-01-13T00:01:00.000Z",
  },
  {
    time: "Jan 14",
    events: 9,
    eventStart: "2024-01-14T00:00:00.000Z",
    eventEnd: "2024-01-14T00:00:00.000Z",
  },
  {
    time: "Jan 15",
    events: 9,
    eventStart: "2024-01-15T00:00:00.000Z",
    eventEnd: "2024-01-15T00:02:00.000Z",
  },
  {
    time: "Jan 16",
    events: 10,
    eventStart: "2024-01-16T00:00:00.000Z",
    eventEnd: "2024-01-16T00:03:00.000Z",
  },
  {
    time: "Jan 17",
    events: 10,
    eventStart: "2024-01-17T00:00:00.000Z",
    eventEnd: "2024-01-17T00:01:00.000Z",
  },
  {
    time: "Jan 18",
    events: 11,
    eventStart: "2024-01-18T00:00:00.000Z",
    eventEnd: "2024-01-18T00:01:00.000Z",
  },
  {
    time: "Jan 19",
    events: 12,
    eventStart: "2024-01-19T00:00:00.000Z",
    eventEnd: "2024-01-19T00:00:00.000Z",
  },
  {
    time: "Jan 20",
    events: 12,
    eventStart: "2024-01-20T00:00:00.000Z",
    eventEnd: "2024-01-20T00:03:00.000Z",
  },
  {
    time: "Jan 21",
    events: 13,
    eventStart: "2024-01-21T00:00:00.000Z",
    eventEnd: "2024-01-21T00:01:00.000Z",
  },
  {
    time: "Jan 22",
    events: 14,
    eventStart: "2024-01-22T00:00:00.000Z",
    eventEnd: "2024-01-22T00:04:00.000Z",
  },
  {
    time: "Jan 23",
    events: 14,
    eventStart: "2024-01-23T00:00:00.000Z",
    eventEnd: "2024-01-23T00:02:00.000Z",
  },
  {
    time: "Jan 24",
    events: 15,
    eventStart: "2024-01-24T00:00:00.000Z",
    eventEnd: "2024-01-24T00:00:00.000Z",
  },
  {
    time: "Jan 25",
    events: 16,
    eventStart: "2024-01-25T00:00:00.000Z",
    eventEnd: "2024-01-25T00:01:00.000Z",
  },
  {
    time: "Jan 26",
    events: 17,
    eventStart: "2024-01-26T00:00:00.000Z",
    eventEnd: "2024-01-26T00:03:00.000Z",
  },
  {
    time: "Jan 27",
    events: 17,
    eventStart: "2024-01-27T00:00:00.000Z",
    eventEnd: "2024-01-27T00:02:00.000Z",
  },
  {
    time: "Jan 28",
    events: 18,
    eventStart: "2024-01-28T00:00:00.000Z",
    eventEnd: "2024-01-28T00:02:00.000Z",
  },
  {
    time: "Jan 29",
    events: 19,
    eventStart: "2024-01-29T00:00:00.000Z",
    eventEnd: "2024-01-29T00:01:00.000Z",
  },
  {
    time: "Jan 30",
    events: 20,
    eventStart: "2024-01-30T00:00:00.000Z",
    eventEnd: "2024-01-30T00:00:00.000Z",
  },
];
export const MetricsAnalytics = ({ isLoading }) => {
  return (
    <>
      <Card background="white">
        <SHeader
          type="card"
          title=""
          actionElements={
            <SelectMenu
              label="hidden"
              labelText="Primary gateway"
              placeholder="Periodic view"
              size="regular"
            >
              <SelectItem value="val1">Periodic view</SelectItem>
              <SelectItem value="val2">Option 2</SelectItem>
              <SelectItem value="val3">Option 3</SelectItem>
            </SelectMenu>
          }
        />

        <div className="h-56">
          <UsageCharts
            enableZoom={false}
            interval={6}
            tooltipTemplate={ChartTooltipTemplate}
            isLoading={isLoading}
            mouseOver={(index) => {}}
            data={chartDatas}
            eventState={"processed"}
            filteredDuration={"custom"}
            onChartItemClick={() => {}}
          />
        </div>
        <div className="flex gap-4 text-center">
          <Link
            href={"/usages/metrics/details/analytics"}
            passHref
            className="font-semibold  hover:underline w-full"
          >
            View details{" "}
            <ChevronRightIcon className="size-5 ml-2 inline-block" />{" "}
          </Link>
        </div>
      </Card>
    </>
  );
};
const ChartTooltipTemplate = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { eventStart, eventEnd, events } = payload[0].payload;
    return (
      <div className="w-54 bg-white  border ml-3 p-4 flex flex-col text-black rounded h-auto">
        <p>{format(eventStart, "d MMM, yyyy hh:mm a")}</p>
        <span>
          Total Usage:{" "}
          <span className="font-semibold"> {events * 61}M Input tokens</span>
        </span>
        <span>
          Customers: <span className="font-semibold "> {events * 53} </span>
        </span>
        <span>
          Subscriptions: <span className="font-semibold "> {events * 81} </span>
        </span>
        {/* <p className='font-semibold m-0 text-primary-400'>{events}k events</p>
          <p className=' m-0'>{format(eventStart, 'dd MMM, yyyy hh:mm:ss a')} </p> */}
        {/* {!isEqual(eventStart,eventEnd) &&  (<><p className='text-sm m-0'>to</p>
          <p className=' m-0'>{format(eventEnd, 'dd MMM, hh:mm a')}</p></>)} */}
      </div>
    );
  }
  return null;
};
