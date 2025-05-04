"use client";

import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  Link,
  SelectItem,
  SelectMenu,
  Tooltip
} from "cb-sting-react-ts";
import React, { useState } from "react";
import { CardHeader } from "./Header";

interface Feature {
  name: string;
  monthlyUnits: number;
  consumedUnits: number;
  addonUnits?: number;
  extraUnits?: number;
  totalUsage: number;
  revenue: number;
}

interface UnitBarProps {
  type: "consumed" | "addon" | "extra" | "remaining";
  units: number;
  feature: Feature;
}
const UsageSummary = () => {
  return (
    <>
      <div>
        <table className="table mt-0">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-row-header-cell ">Feature </th>
              <th className="table-row-header-cell  whitespace-nowrap">
                Total usage
              </th>
              <th className="table-row-header-cell ">Used vs Allocated usage </th>
              <th className="table-row-header-cell ">Overage Usage </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="table-row">
              <td className="">AI Agent conversations</td>
              <td className="">
                <div className="flex items-center  ">
                  <span className=" font-semibold text-lg">9,822</span>
                  <span
                    className={`text-xs flex items-center px-2 py-1 rounded-full`}
                  >
                    <Badge variant="success" size="small">
                      <ArrowUpRightIcon className="size-3 font-semibold" />{" "}
                    </Badge>
                  </span>
                </div>
              </td>
              <td className="">
                <div className="flex items-center ">
                  <span className=" font-semibold text-lg">2,400 / 2,400</span>
                </div>
              </td>
              <td className="">
                <div className="flex items-center ">
                  <span className=" font-semibold text-lg">7,422</span>
                  <span
                    className={`text-xs flex items-center px-2 py-1 rounded-full`}
                  >
                    <Badge variant="success" size="small">
                      <ArrowUpRightIcon className="size-3 font-semibold" />{" "}
                    </Badge>
                  </span>
                </div>
              </td>
            </tr>
            {/* <tr className="table-row">
              <td className="">Gas Manager Policies</td>
              <td className="">
                <div className="flex items-center  ">
                  <span className=" font-semibold text-lg">200</span>
                  <span
                    className={`text-xs flex items-center px-2 py-1 rounded-full`}
                  >
                    <Badge variant="danger" size="small">
                      <ArrowDownLeftIcon className="size-3 mr-2 font-semibold" />{" "}
                      20%
                    </Badge>
                  </span>
                </div>
              </td>
              <td className="">
                <div className="flex items-center ">
                  <span className=" font-semibold text-lg">-</span>
                </div>
              </td>
              <td className="">
                <div className="flex items-center ">
                  <span className=" font-semibold text-lg">200</span>
                  <span
                    className={`text-xs flex items-center px-2 py-1 rounded-full`}
                  >
                    <Badge variant="success" size="small">
                      <ArrowUpRightIcon className="size-3 mr-2 font-semibold" />{" "}
                      12%
                    </Badge>
                  </span>
                </div>
              </td>
            </tr>
            <tr className="table-row">
              <td className="">Throughput</td>
              <td className="">
                <div className="flex items-center  ">
                  <span className=" font-semibold text-lg">600</span>
                  <span
                    className={`text-xs flex items-center px-2 py-1 rounded-full`}
                  >
                    <Badge variant="success" size="small">
                      <ArrowUpRightIcon className="size-3 mr-2 font-semibold" />{" "}
                      13.5%
                    </Badge>
                  </span>
                </div>
              </td>
              <td className="">
                <div className="flex items-center ">
                  <span className=" font-semibold text-lg">300/300</span>
                  <span
                    className={`text-xs flex items-center px-2 py-1 rounded-full`}
                  >
                    <Badge variant="success" size="small">
                      <ArrowUpRightIcon className="size-3 mr-2 font-semibold" />{" "}
                      12%
                    </Badge>
                  </span>
                </div>
              </td>
              <td className="">
                <div className="flex items-center ">
                  <span className=" font-semibold text-lg">-</span>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
        <div className="flex gap-4 text-center">
          <Link
            href={"/usages/detial"}
            passHref
            className="font-semibold text-primary-500  w-full"
          >
            View details{" "}
            <ChevronRightIcon className="size-5 ml-2 inline-block" />{" "}
          </Link>
        </div>
      </div>
    </>
  );
};
const UsageTracker = ({ features }: { features: Feature[] }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Current billing cycle");

  const UnitBar: React.FC<UnitBarProps> = ({ type, units, feature }) => {
    const getBackgroundColor = () => {
      switch (type) {
        case "consumed":
          return "bg-violet-500 hover:bg-violet-600";
        case "addon":
          return "bg-emerald-400 hover:bg-emerald-500";
        case "extra":
          return "bg-blue-500 hover:bg-blue-600";
        default:
          return "bg-gray-200 hover:bg-gray-300";
      }
    };

    const getTooltipContent = () => {
      const percentageOfTotal = ((units / feature.monthlyUnits) * 100).toFixed(
        1
      );
      const dailyAverage = (units / 30).toFixed(1);

      return `${type.charAt(0).toUpperCase() + type.slice(1)} Usage
              ${units} units (${percentageOfTotal}%)
              Daily average: ${dailyAverage} units`;
    };

    // Create array of segments
    const segments = Array.from({ length: units }, (_, index) => (
      <Tooltip
        key={`${type}-${index}`}
        color="dark"
        label={getTooltipContent()}
        placement="top"
        width="Regular"
      >
        <div
          className={`h-8 w-5 mx-[1px] transition-colors duration-200 ${getBackgroundColor()}`}
        />
      </Tooltip>
    ));

    return units > 0 ? <div className="flex">{segments}</div> : null;
  };

  const renderUsageBars = (feature: Feature) => {
    const {
      name,
      monthlyUnits,
      consumedUnits,
      addonUnits = 0,
      extraUnits = 0,
      totalUsage,
      revenue,
    } = feature;

    const remainingUnits =
      monthlyUnits - (consumedUnits + addonUnits + extraUnits);
    const totalUsed = consumedUnits + addonUnits + extraUnits;
    const activeUnits = consumedUnits + addonUnits + extraUnits;
    const markerPosition = (totalUsed / monthlyUnits) * 100;

    return (
      <div key={name} className="">
        <div className="flex justify-between">
          <div className="w-2/6">
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <div className="text-sm text-gray-600 leading-5">
                <div>Total usage: {totalUsage} units</div>
                <div>Total revenue: ${revenue}</div>
              </div>
            </div>
          </div>

          <div className="relative flex w-full rounded-lg overflow-hidden">
            <UnitBar type="consumed" units={consumedUnits} feature={feature} />
            <UnitBar type="addon" units={addonUnits} feature={feature} />
            <UnitBar type="extra" units={extraUnits} feature={feature} />
            <UnitBar
              type="remaining"
              units={remainingUnits}
              feature={feature}
            />

            {/* Vertical marker line */}
            {/* Adjusted marker line to appear at the end of active units */}
            {activeUnits > 0 && (
              <div
                className="absolute top-0 h-10 w-0.5 bg-black"
                style={{
                  left: `${markerPosition}%`,
                  transform: "translateX(-50%)",
                  zIndex: 10,
                }}
              >
                <div className="absolute -right-1 top-0 w-2 h-0.5 bg-black" />
                <div className="absolute -right-1 bottom-0 w-2 h-0.5 bg-black" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <div className="flex gap-large items-center">
        <CardHeader title="Usages"></CardHeader>
        <SelectMenu
          onValueChange={(value: string) => setSelectedPeriod(value)}
          placeholder="Current billing cycle"
          size="regular"
          value={selectedPeriod}
        >
          <SelectItem value="Option 1">Current billing cycle</SelectItem>
          <SelectItem value="Last 7 days">Last 7 days</SelectItem>
          <SelectItem value="Last 30 days">Last 30 days</SelectItem>
          <SelectItem value="Last 90 days">Last 90 days</SelectItem>
        </SelectMenu>
      </div>

      <Card.Content>
        <div>
          <div className="flex w-full">
            <div className="w-2/6"></div>
            <div className="w-full justify-between flex text-sm">
              <div>Nov 1</div>
              <div>Nov 31</div>
            </div>
          </div>
          <div className="space-y-xxlarge">{features.map(renderUsageBars)}</div>
        </div>
        <div className="pt-large flex gap-4">
          <Button
            fullWidth
            variant={"neutral"}
            styleType={"text"}
            size={"regular"}
          >
            View Details
            <ChevronRightIcon />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

const Usages = () => {
  const features = [
    {
      name: "Compute Units",
      monthlyUnits: 150,
      consumedUnits: 10,
      addonUnits: 6,
      extraUnits: 0,
      totalUsage: 250,
      revenue: 60,
    },
    {
      name: "Gas Manager Policies",
      monthlyUnits: 150,
      consumedUnits: 4,
      addonUnits: 4,
      extraUnits: 8,
      totalUsage: 250,
      revenue: 60,
    },
    {
      name: "Feature 3",
      monthlyUnits: 150,
      consumedUnits: 1,
      addonUnits: 3,
      extraUnits: 12,
      totalUsage: 250,
      revenue: 60,
    },
    {
      name: "Feature 4",
      monthlyUnits: 150,
      consumedUnits: 15,
      addonUnits: 2,
      extraUnits: 0,
      totalUsage: 250,
      revenue: 60,
    },
  ];

  return <UsageTracker features={features} />;
};

export { Usages, UsageSummary };
