"use client";
import { TrendBadge } from "@/components/ui/TrendBadge";
import { Card } from "cb-sting-react-ts";

export const UsageSummary = ({ statsData }) => {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-4  bg-gray-50">
      {statsData.map((stat, index) => {
        // Apply the appropriate border styles
        const borderClass =
          index % 3 === 0
            ? "rounded-l-lg" // First element in the row
            : (index + 1) % 3 === 0
            ? "rounded-r-lg" // Last element in the row
            : ""; // Middle elements

        return <StatCard key={index} {...stat} borderClass={borderClass} />;
      })}
    </div>
  );
};
const StatCard = ({
  title,
  value,
  unit,
  change,
  changeType,
  changeDuration,
  borderClass,
}) => {
  return (
    <Card spacey="none" className={`flex flex-col gap-2 bg-white shadow-sm`}>
      <div className="flex items-center justify-between">
        <span className="font-semibold ">{title}</span>
      </div>
      <span className=" text-3xl font-semibold text-gray-800">
        {value}{" "}
        {unit && (
          <span className="text-sm font-normal text-gray-500">{unit}</span>
        )}
      </span>
      <span className={`text-xs flex items-center py-1 rounded-full mt-auto`}>
        <span className={` flex text-base font-semibold -ml-2`}>
          {changeType == "positive" && (
            <TrendBadge variant="up" size="small">
              {change}
            </TrendBadge>
          )}
          {changeType == "negative" && (
            <TrendBadge variant="down" size="small">
              {change}
            </TrendBadge>
          )}
        </span>
        {changeDuration && (
          <span className="text-sm font-normal text-gray-500 leading-tight">
            vs {changeDuration}
          </span>
        )}
      </span>
    </Card>
  );
};
