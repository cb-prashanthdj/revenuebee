"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  Cell,
  Label,
} from "recharts";
import { curveCardinal } from "d3-shape";
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
    allocated: 400,
    exhausted_usage: 0,
  },
  {
    time: "Jan 2",
    events: 3,
    eventStart: "2024-01-02T00:00:00.000Z",
    eventEnd: "2024-01-02T00:03:00.000Z",
    allocated: 316,
    exhausted_usage: 0,
  },
  {
    time: "Jan 3",
    events: 2,
    eventStart: "2024-01-03T00:00:00.000Z",
    eventEnd: "2024-01-03T00:02:00.000Z",
    allocated: 340,
    exhausted_usage: 0,
  },
  {
    time: "Jan 4",
    events: 2,
    eventStart: "2024-01-04T00:00:00.000Z",
    eventEnd: "2024-01-04T00:02:00.000Z",
    allocated: 312,
    exhausted_usage: 0,
  },
  {
    time: "Jan 5",
    events: 1,
    eventStart: "2024-01-05T00:00:00.000Z",
    eventEnd: "2024-01-05T00:01:00.000Z",
    allocated: 264,
    exhausted_usage: 0,
  },
  {
    time: "Jan 6",
    events: 1,
    eventStart: "2024-01-06T00:00:00.000Z",
    eventEnd: "2024-01-06T00:01:00.000Z",
    allocated: 300,
    exhausted_usage: 0,
  },
  {
    time: "Jan 7",
    events: 2,
    eventStart: "2024-01-07T00:00:00.000Z",
    eventEnd: "2024-01-07T00:02:00.000Z",
    allocated: 340,
    exhausted_usage: 0,
  },
  {
    time: "Jan 8",
    events: 1,
    eventStart: "2024-01-08T00:00:00.000Z",
    eventEnd: "2024-01-08T00:01:00.000Z",
    allocated: 240,
    exhausted_usage: 0,
  },
  {
    time: "Jan 9",
    events: 3,
    eventStart: "2024-01-09T00:00:00.000Z",
    eventEnd: "2024-01-09T00:03:00.000Z",
    allocated: 260,
    exhausted_usage: 0,
  },
  {
    time: "Jan 10",
    events: 3,
    eventStart: "2024-01-10T00:00:00.000Z",
    eventEnd: "2024-01-10T00:03:00.000Z",
    allocated: 270,
    exhausted_usage: 0,
  },
  {
    time: "Jan 11",
    events: 2,
    eventStart: "2024-01-11T00:00:00.000Z",
    eventEnd: "2024-01-11T00:02:00.000Z",
    allocated: 310,
    exhausted_usage: 0,
  },
  {
    time: "Jan 12",
    events: 3,
    eventStart: "2024-01-12T00:00:00.000Z",
    eventEnd: "2024-01-12T00:03:00.000Z",
    allocated: 300,
    exhausted_usage: 0,
  },
  {
    time: "Jan 13",
    events: 2,
    eventStart: "2024-01-13T00:00:00.000Z",
    eventEnd: "2024-01-13T00:02:00.000Z",
    allocated: 60,
    exhausted_usage: 246,
  },
  {
    time: "Jan 14",
    events: 0,
    eventStart: "2024-01-14T00:00:00.000Z",
    eventEnd: "2024-01-14T00:00:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 15",
    events: 1,
    eventStart: "2024-01-15T00:00:00.000Z",
    eventEnd: "2024-01-15T00:01:00.000Z",
    allocated: 0,
    exhausted_usage: 312,
  },
  {
    time: "Jan 16",
    events: 3,
    eventStart: "2024-01-16T00:00:00.000Z",
    eventEnd: "2024-01-16T00:03:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 17",
    events: 1,
    eventStart: "2024-01-17T00:00:00.000Z",
    eventEnd: "2024-01-17T00:01:00.000Z",
    allocated: 0,
    exhausted_usage: 314,
  },
  {
    time: "Jan 18",
    events: 1,
    eventStart: "2024-01-18T00:00:00.000Z",
    eventEnd: "2024-01-18T00:01:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 19",
    events: 2,
    eventStart: "2024-01-19T00:00:00.000Z",
    eventEnd: "2024-01-19T00:02:00.000Z",
    allocated: 0,
    exhausted_usage: 358,
  },
  {
    time: "Jan 20",
    events: 3,
    eventStart: "2024-01-20T00:00:00.000Z",
    eventEnd: "2024-01-20T00:03:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 21",
    events: 1,
    eventStart: "2024-01-21T00:00:00.000Z",
    eventEnd: "2024-01-21T00:01:00.000Z",
    allocated: 0,
    exhausted_usage: 396,
  },
  {
    time: "Jan 22",
    events: 4,
    eventStart: "2024-01-22T00:00:00.000Z",
    eventEnd: "2024-01-22T00:04:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 23",
    events: 2,
    eventStart: "2024-01-23T00:00:00.000Z",
    eventEnd: "2024-01-23T00:02:00.000Z",
    allocated: 0,
    exhausted_usage: 246,
  },
  {
    time: "Jan 24",
    events: 0,
    eventStart: "2024-01-24T00:00:00.000Z",
    eventEnd: "2024-01-24T00:00:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 25",
    events: 3,
    eventStart: "2024-01-25T00:00:00.000Z",
    eventEnd: "2024-01-25T00:03:00.000Z",
    allocated: 0,
    exhausted_usage: 352,
  },
  {
    time: "Jan 26",
    events: 3,
    eventStart: "2024-01-26T00:00:00.000Z",
    eventEnd: "2024-01-26T00:03:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 27",
    events: 1,
    eventStart: "2024-01-27T00:00:00.000Z",
    eventEnd: "2024-01-27T00:01:00.000Z",
    allocated: 0,
    exhausted_usage: 304,
  },
  {
    time: "Jan 28",
    events: 2,
    eventStart: "2024-01-28T00:00:00.000Z",
    eventEnd: "2024-01-28T00:02:00.000Z",
    allocated: 0,
    exhausted_usage: 260,
  },
  {
    time: "Jan 29",
    events: 2,
    eventStart: "2024-01-29T00:00:00.000Z",
    eventEnd: "2024-01-29T00:02:00.000Z",
    allocated: 0,
    exhausted_usage: 300,
  },
  {
    time: "Jan 30",
    events: 0,
    eventStart: "2024-01-30T00:00:00.000Z",
    eventEnd: "2024-01-30T00:00:00.000Z",
    allocated: 0,
    exhausted_usage: 104,
  },
];
export const TotalUsageChart = ({ interval = 0 }: { interval: number }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [highlightedBarIndex, setHighlightedBarIndex] = useState<number | null>(
    0
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // const timeData = processTimeData();
  const CustomXAxisTick = ({ x, y, payload }) => {
    const lines = payload.value.split("/"); // Split the label by space or a custom delimiter
    return (
      <g transform={`translate(${x},${y + 10})`}>
        <text x={0} y={0} textAnchor="middle" fill="#666" fontSize={10}>
          {lines[0]}
        </text>
        <text x={0} y={12} textAnchor="middle" fill="#666" fontSize={10}>
          {lines[1]}
        </text>
        {false && (
          <>
            <text x={0} y={24} textAnchor="middle" fill="#666" fontSize={10}>
              -
            </text>
            <text x={0} y={36} textAnchor="middle" fill="#666" fontSize={10}>
              {lines[3]}
            </text>
            <text x={0} y={48} textAnchor="middle" fill="#666" fontSize={10}>
              {lines[4]}
            </text>
          </>
        )}
      </g>
    );
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { allocated, exhausted_usage, events, eventStart } =
        payload[0].payload;
      return (
        <div className="w-54 bg-white text-black border ml-3 p-4  rounded h-auto">
          <div>
            Plan entitlement with {allocated}k <br />
            tokens allocated usage {exhausted_usage}
            <br /> exhausted on {format(eventStart, "dd MMM, hh:mm a")}
          </div>
          {/* {!isEqual(eventStart,eventEnd) &&  (<><p className='text-sm m-0'>to</p>
        <p className=' m-0'>{format(eventEnd, 'dd MMM, hh:mm a')}</p></>)} */}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="w-full h-full ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartDatas}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="time"
            interval={interval}
            // tick={{ fontSize: 12, fill: '#6B7280' }}
            tick={CustomXAxisTick}
            // tickFormatter={(value,index) => `${tickFormatter(value, index)}`}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#666" }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            tickCount={5}
            domain={[0, "auto"]}
          >
            {/* <Label
        value="Values"
        angle={-90}
        position="insideLeft"
        style={{ textAnchor: "middle" }}
      /> */}
          </YAxis>
          <Tooltip content={CustomTooltip} cursor={false} />
          ddd
          <Bar
            dataKey="allocated"
            name="No of events"
            fill={"#986CF7"}
            barSize={20}
            stackId="a"
          >
            {chartDatas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#986CF7"} />
            ))}
          </Bar>
          <Bar
            dataKey="exhausted_usage"
            name="No of events"
            fill={"#82BFFD"}
            barSize={60}
            stackId="a"
          >
            {chartDatas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#82BFFD"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
