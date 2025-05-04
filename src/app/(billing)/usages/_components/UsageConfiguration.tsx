"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Button,
  SHeader,
  SelectItem,
  SelectMenu,
  Badge,
} from "cb-sting-react-ts";
import { RevenueChart } from "../detial/_components/RevenueChart";

export const UsageConfiguration = ({ status }) => {
  return (
    <>
      <Card padding="none">
        {/* <!-- Aggregation Section --> */}
        <div className="divide-y">
          <div className=" w-full font-semibold p-regular uppercase">
            Aggregation
          </div>
          <div className="flex items-center space-x-2 p-regular">
            <span className="text-gray-600">Count of</span>
            <Badge rounded="small" variant="neutral" className="!normal-case">
              {" "}
              event_Id
            </Badge>
          </div>
        </div>
      </Card>
      {/* <!-- Filter Conditions Section --> */}
      <Card padding="none">
        <div className="divide-y">
          <div className=" w-full font-semibold p-regular uppercase">
            Filter conditions
          </div>
          <div className="">
            {/* <!-- First Filter --> */}
            <div className="flex items-center space-x-2  p-regular">
              <span className="text-gray-600">Events with</span>
              <Badge rounded="small" variant="neutral" className="!normal-case">
                {" "}
                agent_type
              </Badge>
              <span className="text-gray-600">=</span>
              <Badge rounded="small" variant="neutral">
                {" "}
                AI Agent
              </Badge>
            </div>
            {status === "new" && (
              <div className="flex items-center space-x-2  p-regular">
                <span className="text-gray-600">and</span>
                <Badge
                  rounded="small"
                  variant="neutral"
                  className="!normal-case"
                >
                  {" "}
                  ticket_resolved
                </Badge>
                <span className="text-gray-600">=</span>
                <Badge
                  rounded="small"
                  variant="neutral"
                  className="!normal-case"
                >
                  {" "}
                  TRUE
                </Badge>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};
