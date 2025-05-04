"use client";

import {
  AdjustmentsVerticalIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { Button } from "cb-sting-react-ts";
import React, { useEffect, useState } from "react";
import { ConditionFilter } from "./ConditionFilter";
import { CustomFilter } from "./CustomFilter";
import { parse, format, addMinutes } from "date-fns";

interface TimeRange {
  start: string;
  end: string;
  count: string;
}

const timeFilters = [
  // { label: '1 min', value: '1min' },
  { label: "30 min", value: "30mins" },
  { label: "1 hr", value: "1hr" },
  { label: "12 hr", value: "12hr" },
  { label: "24 hr", value: "24hr" },
  // { label: 'Custom', value: 'custom' }
];

const getTimeRange = (filterValue: string): TimeRange => {
  const now = new Date();
  const end = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "EST",
  });

  const startDate = new Date(now);

  switch (filterValue) {
    case "1min":
      startDate.setMinutes(startDate.getMinutes() - 1);
      return {
        start: startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "EST",
        }),
        end,
        count: "100k",
      };
    case "30mins":
      startDate.setMinutes(startDate.getMinutes() - 30);
      return {
        start: startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "EST",
        }),
        end,
        count: "300k",
      };
    case "1hr":
      startDate.setHours(startDate.getHours() - 1);
      return {
        start: startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "EST",
        }),
        end,
        count: "500k",
      };
    case "12hr":
      startDate.setHours(startDate.getHours() - 12);
      return {
        start: startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "EST",
        }),
        end,
        count: "1.2M",
      };
    case "24hr":
      startDate.setHours(startDate.getHours() - 24);
      return {
        start: startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "EST",
        }),
        end,
        count: "2.4M",
      };
    default:
      return { start: end, end, count: "0" };
  }
};

export const FilterByDuration = ({
  eventsState,
  onClickFilter,
  onCustomDuration,
  eventsCount,
  enableConditionFilter,
  customAction,
}: {
  customAction?: React.ReactNode;
  eventsCount: number;
  eventsState: string;
  onClickFilter: (duration: { label: string; value: string }) => void;
  enableConditionFilter?: boolean;
  onCustomDuration: (eventStart: Date, eventEnd: Date) => void;
}) => {
  const [selectedDuration, setSelectedDuration] = useState(timeFilters[0]); // Default to 1hr
  const [isLoading, setIsLoading] = useState(false); // Default to 1hr
  const [timeRange, setTimeRange] = useState<TimeRange>(
    getTimeRange(timeFilters[0].value)
  );
  const failedState = eventsState === "failed";

  useEffect(() => {
    if (selectedDuration.value != "custom")
      setTimeRange(getTimeRange(selectedDuration.value));
  }, [selectedDuration]);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [eventsCount]);
  const onClickHandler = (duration: { label: string; value: string }) => {
    setSelectedDuration(duration);
    setTimeRange(getTimeRange(duration.value));
    onClickFilter(duration);
  };
  const handleConditionsChange = (newConditions) => {
    setSelectedDuration({ label: "Condition", value: "condition" });
    onCustomDuration(new Date(), addMinutes(new Date(), 58));
    setTimeRange({
      start: format(new Date(), "dd MMM,yyyy HH:mm a"),
      end: format(addMinutes(new Date(), 58), "dd MMM,yyyy HH:mm a"),
      count: "34k",
    });
  };
  const handleCustomFilterChange = (start, end) => {
    setSelectedDuration({ label: "Custom", value: "custom" });
    setTimeRange({
      start: format(start, "dd MMM,yyyy HH:mm a"),
      end: format(start, "dd MMM,yyyy HH:mm a"),
      count: "110k",
    });
    onCustomDuration(start, end);
    onClickFilter({ label: "Custom", value: "custom" });
  };
  return (
    <div className="flex flex-col gap-regular relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-large overflow-hidden">
          <ul className="flex pl-0 mb-0 w-fit flex-shrink border rounded divide-x divide-neutral-100">
            {timeFilters.map((duration, index) => (
              <li
                key={duration.value}
                className={`py-small px-large cursor-pointer  
                  ${
                    selectedDuration.value === duration.value
                      ? "bg-primary-50"
                      : "bg-white"
                  }
                  ${index === 0 ? "rounded-l " : ""}
                  ${index !== 0 && index !== timeFilters.length - 1 ? "" : ""}
                `}
              >
                <Button
                  aria-label="Usage Events Table"
                  role="tooltip"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickHandler(duration);
                  }}
                >
                  {duration.label}
                </Button>
              </li>
            ))}
            <li
              className={`py-small px-regular cursor-pointer 
                ${selectedDuration.value === "custom" ? "bg-primary-50" : ""} 
                `}
            >
              <CustomFilter
                onConditionsChange={() => {}}
                onOk={handleCustomFilterChange}
                onCancel={() => {}}
              />
            </li>
          </ul>
          {enableConditionFilter && (
            <ConditionFilter onConditionsChange={handleConditionsChange} />
          )}
          {customAction && customAction}
          {/* <Button variant="neutral" styleType="outline" >View associated events</Button> */}
          {/* <Button styleType="outline" size="regular" variant="neutral" >
  <ViewColumnsIcon className="size-4" /> Edit Columns
</Button> */}
        </div>

        {/* <Button styleType="text" size="large" variant="neutral">
          <ViewColumnsIcon className="size-4" /> Edit Columns
        </Button> */}
      </div>

      {selectedDuration && timeRange.start && (
        <div className="text-neutral-600 font-semibold flex justify-between pt-2">
          {isLoading && (
            <div className="animate-pulse bg-gray-200 h-4 w-1/3 rounded"></div>
          )}
          {!isLoading && (
            <>
              Showing {new Intl.NumberFormat("en-US").format(eventsCount * 100)}{" "}
              events between {timeRange.start} and {timeRange.end} EST
            </>
          )}
          <span className="text-sm font-normal italic">
            Click or drag across bars to zoom in
          </span>
        </div>
      )}
    </div>
  );
};
