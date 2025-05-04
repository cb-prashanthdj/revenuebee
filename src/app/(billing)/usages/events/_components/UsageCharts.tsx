import { Card } from "cb-sting-react-ts";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";
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

const UsageCharts = ({
  data,
  filteredDuration,
  onChartItemClick,
  eventState,
  mouseOver,
  highlitedIndex,
  isLoading = false,
  tooltipTemplate,
  interval = 0,
  mx = 1,
  enableZoom = true,
}: {
  data: any;
  filteredDuration: string;
  onChartItemClick: (start: Date, end: Date) => void;
  eventState: string;
  mouseOver?: (index: number) => void;
  highlitedIndex?: number;
  isLoading: boolean;
  tooltipTemplate?: any;
  interval?: number;
  mx?: number;
  enableZoom?: boolean;
}) => {
  const [zoomRange, setZoomRange] = useState({ zoomStart: "", zoomEnd: "" });
  const [highlightedBarIndex, setHighlightedBarIndex] = useState<number | null>(
    highlitedIndex
  );
  const processTimeData = () => {
    const timeGroups: { [key: string]: { time: string; events: number } } = {};

    data.forEach((item) => {
      let timeKey;
      const [datePart, timePart] = item.timestamp.split(" ");

      const [hours, minutes] = timePart.split(":");

      // Format time as "hh:mm AM/PM"
      const hour = parseInt(hours);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      const formattedTime = `${formattedHour}:${minutes} ${period}`;

      // Group by 2-minute intervals
      const roundedMinutes = Math.floor(parseInt(minutes) / 2) * 2;
      timeKey = `${formattedHour}:${roundedMinutes
        .toString()
        .padStart(2, "0")} ${period}`;

      if (!timeGroups[timeKey]) {
        timeGroups[timeKey] = {
          time: timeKey,
          events: 0,
        };
      }

      timeGroups[timeKey].events += 1;
    });

    return Object.values(timeGroups).sort((a, b) => {
      // Convert times to minutes for comparison
      const getMinutes = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        const [hours, minutes] = time.split(":").map(Number);
        let totalMinutes = hours * 60 + minutes;
        if (period === "PM" && hours !== 12) totalMinutes += 12 * 60;
        if (period === "AM" && hours === 12) totalMinutes = minutes;
        return totalMinutes;
      };
      return getMinutes(a.time) - getMinutes(b.time);
    });
  };

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
  const tickFormatter = (value, index) => {
    const item = data[index]; // Access additional data for the current index
    return <p>s</p>;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { eventStart, eventEnd, events } = payload[0].payload;
      return (
        <div className="w-54 bg-white text-black border ml-3 p-4  rounded h-auto">
          <p className="font-semibold m-0">{events * mx} events</p>
          <p className=" m-0">
            {format(eventStart, "dd MMM, yyyy hh:mm:ss a")}{" "}
          </p>
          {/* {!isEqual(eventStart,eventEnd) &&  (<><p className='text-sm m-0'>to</p>
        <p className=' m-0'>{format(eventEnd, 'dd MMM, hh:mm a')}</p></>)} */}
        </div>
      );
    }
    return null;
  };
  const handleBarClick = (currdata, index) => {
    console.log("Bar clicked:", currdata);
    console.log("currdata:", isEqual(currdata.eventStart, currdata.eventEnd));
    if (!isEqual(currdata.eventStart, currdata.eventEnd))
      onChartItemClick(currdata.eventStart, currdata.eventEnd);
  };
  const getTimestamp = (time: string, end: boolean = false) => {
    const foundItem = data.find((item) => item.time === time);
    return foundItem ? (end ? foundItem.eventEnd : foundItem.eventStart) : "";
  };
  const zoom = () => {
    if (zoomRange.zoomStart && zoomRange.zoomEnd) {
      // console.log('Zooming from:', getTimestamp(zoomRange.zoomStart));
      onChartItemClick(
        getTimestamp(zoomRange.zoomStart),
        getTimestamp(zoomRange.zoomEnd, true)
      );
    }
    // Reset the selection after zooming
    setZoomRange({ zoomStart: "", zoomEnd: "" });
  };
  const resetZoom = () => {
    // Reset the selection after zooming
    onChartItemClick(null, null);
  };
  const handleMouseEnter = (index: number) => {
    setHighlightedBarIndex(index); // Store the index of the bar being hovered
    mouseOver(index);
  };

  const handleMouseLeave = () => {
    setHighlightedBarIndex(null); // Reset when mouse leaves
    mouseOver(-1);
  };
  useEffect(() => {
    setHighlightedBarIndex(highlitedIndex);
  }, [highlitedIndex]);

  const Placeholder = () => (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <p>Loading...</p>
      <div
        style={{
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
          margin: "auto",
        }}
      />
      <style>
        {`@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`}
      </style>
    </div>
  );
  return (
    <div className="h-full relative" style={{ userSelect: "none" }}>
      {isLoading ? (
        // Loading block
        <>
          <Placeholder />
        </>
      ) : (
        // Chart block
        <>
          {enableZoom && (
            <div className="text-right">
              <button type="button" className="btn update " onClick={resetZoom}>
                Reset zoom
              </button>
            </div>
          )}
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 10,
              }}
              onMouseDown={(e: any) => {
                e?.activePayload &&
                  setZoomRange((prvState) => ({
                    ...prvState,
                    zoomStart: e.activePayload[0]?.payload.time,
                  }));
              }}
              onMouseMove={(e: any) => {
                if (zoomRange.zoomStart) {
                  e?.activePayload &&
                    setZoomRange((prvState) => ({
                      ...prvState,
                      zoomEnd: e.activePayload[0]?.payload.time,
                    }));
                }
              }}
              onMouseUp={zoom}
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
                tickFormatter={(value) => `${value * mx}`}
                tick={{ fontSize: 12, fill: "#666" }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
                domain={[0, "auto"]}
              >
                {/* <Label
        value="Values"
        angle={-90}
        position="insideLeft"
        style={{ textAnchor: "middle" }}
      /> */}
              </YAxis>
              <Tooltip
                content={tooltipTemplate ? tooltipTemplate : CustomTooltip}
                cursor={false}
              />
              <Bar
                dataKey="events"
                name="No of events"
                fill={"#0472E1"}
                radius={[4, 4, 0, 0]} // Rounded top corners
                barSize={60}
                onClick={(data, index) => handleBarClick(data, index)}
                onMouseEnter={(e, index) => handleMouseEnter(index)} // Handle mouse enter
                onMouseLeave={handleMouseLeave} // Handle mouse leave
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    // fill={
                    //   highlightedBarIndex === index
                    //     ? "#0359af" // Hover color
                    //     : "#82bffd" // Default color
                    // }
                    fill={
                      highlightedBarIndex === index
                        ? eventState === "failed"
                          ? "#D95453"
                          : "#0359af" // Hover color
                        : eventState === "failed"
                        ? "#EE9190"
                        : "#82bffd" // Default color
                    }
                    onMouseEnter={() => setHighlightedBarIndex(index)} // Update hover index
                    onMouseLeave={() => setHighlightedBarIndex(null)} // Reset hover index
                  />
                ))}
              </Bar>
              <ReferenceArea
                x1={zoomRange.zoomStart}
                x2={zoomRange.zoomEnd}
                stroke="#93C5FD"
                fill="#93C5FD"
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default UsageCharts;
