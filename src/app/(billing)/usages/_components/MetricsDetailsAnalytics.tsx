"use client";
import React, { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Card, SHeader, SelectMenu, SelectItem } from "cb-sting-react-ts";
import UsageCharts from "../events/_components/UsageCharts";
import { MetricsAnalytics } from "./MetricsAnalytics";
import { set } from "lodash";
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
    events: 3,
    eventStart: "2024-01-02T00:00:00.000Z",
    eventEnd: "2024-01-02T00:00:00.000Z",
  },
  {
    time: "Jan 3",
    events: 2,
    eventStart: "2024-01-03T00:00:00.000Z",
    eventEnd: "2024-01-03T00:02:00.000Z",
  },
  {
    time: "Jan 4",
    events: 4,
    eventStart: "2024-01-04T00:00:00.000Z",
    eventEnd: "2024-01-04T00:02:00.000Z",
  },
  {
    time: "Jan 5",
    events: 3,
    eventStart: "2024-01-05T00:00:00.000Z",
    eventEnd: "2024-01-05T00:01:00.000Z",
  },
  {
    time: "Jan 6",
    events: 4,
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
    events: 3,
    eventStart: "2024-01-08T00:00:00.000Z",
    eventEnd: "2024-01-08T00:01:00.000Z",
  },
  {
    time: "Jan 9",
    events: 4,
    eventStart: "2024-01-09T00:00:00.000Z",
    eventEnd: "2024-01-09T00:02:00.000Z",
  },
  {
    time: "Jan 10",
    events: 5,
    eventStart: "2024-01-10T00:00:00.000Z",
    eventEnd: "2024-01-10T00:03:00.000Z",
  },
  {
    time: "Jan 11",
    events: 6,
    eventStart: "2024-01-11T00:00:00.000Z",
    eventEnd: "2024-01-11T00:00:00.000Z",
  },
  {
    time: "Jan 12",
    events: 7,
    eventStart: "2024-01-12T00:00:00.000Z",
    eventEnd: "2024-01-12T00:03:00.000Z",
  },
  {
    time: "Jan 13",
    events: 6,
    eventStart: "2024-01-13T00:00:00.000Z",
    eventEnd: "2024-01-13T00:01:00.000Z",
  },
  {
    time: "Jan 14",
    events: 7,
    eventStart: "2024-01-14T00:00:00.000Z",
    eventEnd: "2024-01-14T00:00:00.000Z",
  },
  {
    time: "Jan 15",
    events: 8,
    eventStart: "2024-01-15T00:00:00.000Z",
    eventEnd: "2024-01-15T00:02:00.000Z",
  },
  {
    time: "Jan 16",
    events: 9,
    eventStart: "2024-01-16T00:00:00.000Z",
    eventEnd: "2024-01-16T00:03:00.000Z",
  },
  {
    time: "Jan 17",
    events: 8,
    eventStart: "2024-01-17T00:00:00.000Z",
    eventEnd: "2024-01-17T00:01:00.000Z",
  },
  {
    time: "Jan 18",
    events: 9,
    eventStart: "2024-01-18T00:00:00.000Z",
    eventEnd: "2024-01-18T00:01:00.000Z",
  },
  {
    time: "Jan 19",
    events: 8,
    eventStart: "2024-01-19T00:00:00.000Z",
    eventEnd: "2024-01-19T00:00:00.000Z",
  },
  {
    time: "Jan 20",
    events: 10,
    eventStart: "2024-01-20T00:00:00.000Z",
    eventEnd: "2024-01-20T00:03:00.000Z",
  },
  {
    time: "Jan 21",
    events: 9,
    eventStart: "2024-01-21T00:00:00.000Z",
    eventEnd: "2024-01-21T00:01:00.000Z",
  },
  {
    time: "Jan 22",
    events: 11,
    eventStart: "2024-01-22T00:00:00.000Z",
    eventEnd: "2024-01-22T00:04:00.000Z",
  },
  {
    time: "Jan 23",
    events: 10,
    eventStart: "2024-01-23T00:00:00.000Z",
    eventEnd: "2024-01-23T00:02:00.000Z",
  },
  {
    time: "Jan 24",
    events: 11,
    eventStart: "2024-01-24T00:00:00.000Z",
    eventEnd: "2024-01-24T00:00:00.000Z",
  },
  {
    time: "Jan 25",
    events: 12,
    eventStart: "2024-01-25T00:00:00.000Z",
    eventEnd: "2024-01-25T00:01:00.000Z",
  },
  {
    time: "Jan 26",
    events: 13,
    eventStart: "2024-01-26T00:00:00.000Z",
    eventEnd: "2024-01-26T00:03:00.000Z",
  },
  {
    time: "Jan 27",
    events: 12,
    eventStart: "2024-01-27T00:00:00.000Z",
    eventEnd: "2024-01-27T00:02:00.000Z",
  },
  {
    time: "Jan 28",
    events: 11,
    eventStart: "2024-01-28T00:00:00.000Z",
    eventEnd: "2024-01-28T00:02:00.000Z",
  },
  {
    time: "Jan 29",
    events: 10,
    eventStart: "2024-01-29T00:00:00.000Z",
    eventEnd: "2024-01-29T00:01:00.000Z",
  },
  {
    time: "Jan 30",
    events: 15,
    eventStart: "2024-01-30T00:00:00.000Z",
    eventEnd: "2024-01-30T00:00:00.000Z",
  },
];

const chartDatas1 = [
  {
    time: "Jan 1",
    events: 3,
    eventStart: "2024-01-01T00:00:00.000Z",
    eventEnd: "2024-01-01T00:01:00.000Z",
  },
  {
    time: "Jan 2",
    events: 3,
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
    events: 4,
    eventStart: "2024-01-04T00:00:00.000Z",
    eventEnd: "2024-01-04T00:02:00.000Z",
  },
  {
    time: "Jan 5",
    events: 3,
    eventStart: "2024-01-05T00:00:00.000Z",
    eventEnd: "2024-01-05T00:01:00.000Z",
  },
  {
    time: "Jan 6",
    events: 3,
    eventStart: "2024-01-06T00:00:00.000Z",
    eventEnd: "2024-01-06T00:01:00.000Z",
  },
  {
    time: "Jan 7",
    events: 3,
    eventStart: "2024-01-07T00:00:00.000Z",
    eventEnd: "2024-01-07T00:03:00.000Z",
  },
  {
    time: "Jan 8",
    events: 3,
    eventStart: "2024-01-08T00:00:00.000Z",
    eventEnd: "2024-01-08T00:01:00.000Z",
  },
  {
    time: "Jan 9",
    events: 2,
    eventStart: "2024-01-09T00:00:00.000Z",
    eventEnd: "2024-01-09T00:02:00.000Z",
  },
  {
    time: "Jan 10",
    events: 3,
    eventStart: "2024-01-10T00:00:00.000Z",
    eventEnd: "2024-01-10T00:03:00.000Z",
  },
  {
    time: "Jan 11",
    events: 3,
    eventStart: "2024-01-11T00:00:00.000Z",
    eventEnd: "2024-01-11T00:00:00.000Z",
  },
  {
    time: "Jan 12",
    events: 3,
    eventStart: "2024-01-12T00:00:00.000Z",
    eventEnd: "2024-01-12T00:03:00.000Z",
  },
  {
    time: "Jan 13",
    events: 3,
    eventStart: "2024-01-13T00:00:00.000Z",
    eventEnd: "2024-01-13T00:01:00.000Z",
  },
  {
    time: "Jan 14",
    events: 3,
    eventStart: "2024-01-14T00:00:00.000Z",
    eventEnd: "2024-01-14T00:00:00.000Z",
  },
  {
    time: "Jan 15",
    events: 3,
    eventStart: "2024-01-15T00:00:00.000Z",
    eventEnd: "2024-01-15T00:02:00.000Z",
  },
  {
    time: "Jan 16",
    events: 4,
    eventStart: "2024-01-16T00:00:00.000Z",
    eventEnd: "2024-01-16T00:03:00.000Z",
  },
  {
    time: "Jan 17",
    events: 3,
    eventStart: "2024-01-17T00:00:00.000Z",
    eventEnd: "2024-01-17T00:01:00.000Z",
  },
  {
    time: "Jan 18",
    events: 3,
    eventStart: "2024-01-18T00:00:00.000Z",
    eventEnd: "2024-01-18T00:01:00.000Z",
  },
  {
    time: "Jan 19",
    events: 3,
    eventStart: "2024-01-19T00:00:00.000Z",
    eventEnd: "2024-01-19T00:00:00.000Z",
  },
  {
    time: "Jan 20",
    events: 2,
    eventStart: "2024-01-20T00:00:00.000Z",
    eventEnd: "2024-01-20T00:03:00.000Z",
  },
  {
    time: "Jan 21",
    events: 3,
    eventStart: "2024-01-21T00:00:00.000Z",
    eventEnd: "2024-01-21T00:01:00.000Z",
  },
  {
    time: "Jan 22",
    events: 3,
    eventStart: "2024-01-22T00:00:00.000Z",
    eventEnd: "2024-01-22T00:04:00.000Z",
  },
  {
    time: "Jan 23",
    events: 3,
    eventStart: "2024-01-23T00:00:00.000Z",
    eventEnd: "2024-01-23T00:02:00.000Z",
  },
  {
    time: "Jan 24",
    events: 3,
    eventStart: "2024-01-24T00:00:00.000Z",
    eventEnd: "2024-01-24T00:00:00.000Z",
  },
  {
    time: "Jan 25",
    events: 3,
    eventStart: "2024-01-25T00:00:00.000Z",
    eventEnd: "2024-01-25T00:01:00.000Z",
  },
  {
    time: "Jan 26",
    events: 3,
    eventStart: "2024-01-26T00:00:00.000Z",
    eventEnd: "2024-01-26T00:03:00.000Z",
  },
  {
    time: "Jan 27",
    events: 4,
    eventStart: "2024-01-27T00:00:00.000Z",
    eventEnd: "2024-01-27T00:02:00.000Z",
  },
  {
    time: "Jan 28",
    events: 3,
    eventStart: "2024-01-28T00:00:00.000Z",
    eventEnd: "2024-01-28T00:02:00.000Z",
  },
  {
    time: "Jan 29",
    events: 3,
    eventStart: "2024-01-29T00:00:00.000Z",
    eventEnd: "2024-01-29T00:01:00.000Z",
  },
  {
    time: "Jan 30",
    events: 3,
    eventStart: "2024-01-30T00:00:00.000Z",
    eventEnd: "2024-01-30T00:00:00.000Z",
  },
];

const chartDatas2 = [
  {
    time: "Jan 1",
    events: 3,
    eventStart: "2024-01-01T00:00:00.000Z",
    eventEnd: "2024-01-01T00:01:00.000Z",
  },
  {
    time: "Jan 2",
    events: 3,
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
    events: 4,
    eventStart: "2024-01-04T00:00:00.000Z",
    eventEnd: "2024-01-04T00:02:00.000Z",
  },
  {
    time: "Jan 5",
    events: 3,
    eventStart: "2024-01-05T00:00:00.000Z",
    eventEnd: "2024-01-05T00:01:00.000Z",
  },
  {
    time: "Jan 6",
    events: 3,
    eventStart: "2024-01-06T00:00:00.000Z",
    eventEnd: "2024-01-06T00:01:00.000Z",
  },
  {
    time: "Jan 7",
    events: 3,
    eventStart: "2024-01-07T00:00:00.000Z",
    eventEnd: "2024-01-07T00:03:00.000Z",
  },
  {
    time: "Jan 8",
    events: 3,
    eventStart: "2024-01-08T00:00:00.000Z",
    eventEnd: "2024-01-08T00:01:00.000Z",
  },
  {
    time: "Jan 9",
    events: 2,
    eventStart: "2024-01-09T00:00:00.000Z",
    eventEnd: "2024-01-09T00:02:00.000Z",
  },
  {
    time: "Jan 10",
    events: 3,
    eventStart: "2024-01-10T00:00:00.000Z",
    eventEnd: "2024-01-10T00:03:00.000Z",
  },
  {
    time: "Jan 11",
    events: 3,
    eventStart: "2024-01-11T00:00:00.000Z",
    eventEnd: "2024-01-11T00:00:00.000Z",
  },
  {
    time: "Jan 12",
    events: 3,
    eventStart: "2024-01-12T00:00:00.000Z",
    eventEnd: "2024-01-12T00:03:00.000Z",
  },
  {
    time: "Jan 13",
    events: 3,
    eventStart: "2024-01-13T00:00:00.000Z",
    eventEnd: "2024-01-13T00:01:00.000Z",
  },
  {
    time: "Jan 14",
    events: 3,
    eventStart: "2024-01-14T00:00:00.000Z",
    eventEnd: "2024-01-14T00:00:00.000Z",
  },
  {
    time: "Jan 15",
    events: 3,
    eventStart: "2024-01-15T00:00:00.000Z",
    eventEnd: "2024-01-15T00:02:00.000Z",
  },
  {
    time: "Jan 16",
    events: 4,
    eventStart: "2024-01-16T00:00:00.000Z",
    eventEnd: "2024-01-16T00:03:00.000Z",
  },
  {
    time: "Jan 17",
    events: 3,
    eventStart: "2024-01-17T00:00:00.000Z",
    eventEnd: "2024-01-17T00:01:00.000Z",
  },
  {
    time: "Jan 18",
    events: 3,
    eventStart: "2024-01-18T00:00:00.000Z",
    eventEnd: "2024-01-18T00:01:00.000Z",
  },
  {
    time: "Jan 19",
    events: 3,
    eventStart: "2024-01-19T00:00:00.000Z",
    eventEnd: "2024-01-19T00:00:00.000Z",
  },
  {
    time: "Jan 20",
    events: 2,
    eventStart: "2024-01-20T00:00:00.000Z",
    eventEnd: "2024-01-20T00:03:00.000Z",
  },
  {
    time: "Jan 21",
    events: 3,
    eventStart: "2024-01-21T00:00:00.000Z",
    eventEnd: "2024-01-21T00:01:00.000Z",
  },
  {
    time: "Jan 22",
    events: 3,
    eventStart: "2024-01-22T00:00:00.000Z",
    eventEnd: "2024-01-22T00:04:00.000Z",
  },
  {
    time: "Jan 23",
    events: 3,
    eventStart: "2024-01-23T00:00:00.000Z",
    eventEnd: "2024-01-23T00:02:00.000Z",
  },
  {
    time: "Jan 24",
    events: 3,
    eventStart: "2024-01-24T00:00:00.000Z",
    eventEnd: "2024-01-24T00:00:00.000Z",
  },
  {
    time: "Jan 25",
    events: 3,
    eventStart: "2024-01-25T00:00:00.000Z",
    eventEnd: "2024-01-25T00:01:00.000Z",
  },
  {
    time: "Jan 26",
    events: 3,
    eventStart: "2024-01-26T00:00:00.000Z",
    eventEnd: "2024-01-26T00:03:00.000Z",
  },
  {
    time: "Jan 27",
    events: 4,
    eventStart: "2024-01-27T00:00:00.000Z",
    eventEnd: "2024-01-27T00:02:00.000Z",
  },
  {
    time: "Jan 28",
    events: 3,
    eventStart: "2024-01-28T00:00:00.000Z",
    eventEnd: "2024-01-28T00:02:00.000Z",
  },
  {
    time: "Jan 29",
    events: 3,
    eventStart: "2024-01-29T00:00:00.000Z",
    eventEnd: "2024-01-29T00:01:00.000Z",
  },
  {
    time: "Jan 30",
    events: 3,
    eventStart: "2024-01-30T00:00:00.000Z",
    eventEnd: "2024-01-30T00:00:00.000Z",
  },
];

export const MetricsDetailsAnalytics = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const [highlitedIndex, setHighlitedIndex] = useState(null);
  return (
    <Card
      background="white"
      className="grid grid-cols-1 divide-y"
      padding="none"
    >
      <Card background="white" depth="flat" className="pb-0">
        <SHeader type="card" title="Usage vs time" />
        <div className="h-36">
          <UsageCharts
            interval={0}
            tooltipTemplate={ChartTooltipTemplate}
            isLoading={isLoading}
            data={chartDatas}
            eventState={"processed"}
            filteredDuration={"custom"}
            onChartItemClick={() => {}}
            highlitedIndex={highlitedIndex}
            mouseOver={(index) => setHighlitedIndex(index)}
            mx={1000}
          />
        </div>
      </Card>
      <Card background="white" depth="flat" className="pb-0">
        <SHeader type="card" title="Customers vs time" />
        <div className="h-36">
          <UsageCharts
            interval={0}
            tooltipTemplate={ChartTooltipTemplate}
            isLoading={isLoading}
            data={chartDatas1}
            eventState={"processed"}
            filteredDuration={"custom"}
            highlitedIndex={highlitedIndex}
            onChartItemClick={() => {}}
            mouseOver={(index) => setHighlitedIndex(index)}
            mx={1000}
          />
        </div>
      </Card>
      <Card background="white" depth="flat" className="pb-0">
        <SHeader type="card" title="Subscriptions vs time" />
        <div className="h-36">
          <UsageCharts
            interval={0}
            tooltipTemplate={ChartTooltipTemplate}
            isLoading={isLoading}
            data={chartDatas2}
            eventState={"processed"}
            filteredDuration={"custom"}
            highlitedIndex={highlitedIndex}
            onChartItemClick={() => {}}
            mouseOver={(index) => setHighlitedIndex(index)}
            mx={1000}
          />
        </div>
      </Card>
    </Card>
  );
};
const ChartTooltipTemplate = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { eventStart, eventEnd, events } = payload[0].payload;
    return (
      <div className="w-54 bg-white  border ml-3 p-4 flex flex-col text-black rounded h-auto">
        <p>{format(eventStart, "d MMM, yyyy hh:mm a")}</p>
        <span>
          Conversations: <span className="font-semibold"> {events * 1000}</span>
        </span>
        <span>
          Customers: <span className="font-semibold"> {events * 500} </span>
        </span>
        <span>
          Subscriptions: <span className="font-semibold"> {events * 500} </span>
        </span>
      </div>
    );
  }
  return null;
};
