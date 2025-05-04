"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Table, Button, Badge, Notification } from "cb-sting-react-ts";
import UsageCharts from "../events/_components/UsageCharts";

export const MetricsNotificationSuccessPricing = () => {
  return (
    <>
      <Notification
        size="regular"
        variant="green"
        width="full"
        icon
        className=""
        iconContent={
          <div className="">
            <CheckCircleIcon />
          </div>
        }
      >
        <h6 className="font-normal mt-0.5">
          You have successfully linked pricing to this metered feature!
        </h6>
      </Notification>
    </>
  );
};
