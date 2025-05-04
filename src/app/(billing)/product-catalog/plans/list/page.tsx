"use client";

import {
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { camelCaseToHumanText } from "@/app/lib/utils";
import PlansTablePattern from "../_components/PlansTablePattern";
import { CardHeader } from "../../_components/Header";
import PlansData from "./plans.json";

import {
  DocumentTextIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Button,
  Card,
  Column,
  Grid,
  Notification,
  OverFlowMenu,
  TabNav,
  TabNavLink,
  SHeader,
  RadioGroup,
} from "cb-sting-react-ts";
import clsx from "clsx";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const headerClassNames = {
  currency: "whitespace-nowrap",
  frequency: "whitespace-nowrap",
  pricingModel: "whitespace-nowrap",
  price: "whitespace-nowrap",
  billingCycle: "whitespace-nowrap",
  trial: "whitespace-nowrap",
  preview: "whitespace-nowrap",
};

const PlanPage = (props: Props) => {
  const [filteredPlans, setFilteredPlans] = useState<unknown[]>(PlansData);
  return (
    <div className="bodyContent">
      {/* header */}
      <div className="flex items-center justify-between !mt-0">
        <div className="-mt-2">
          <div className="flex items-center gap-4 divide-x">
            <h2 className="h2 leading-none">Plans</h2>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="neutral">Import Plans</Button>
          <Button variant="primary">Create Plan</Button>
        </div>
      </div>
      {/* header */}

      <div className="flex items-start justify-normal gap-4">
        <RadioGroup
          align="horizontal"
          description=""
          onChangeLogic={() => {}}
          options={[
            {
              label: "All",
              value: "Option1",
            },
            {
              label: "Cancelled",
              value: "Option2",
            },
            {
              label: "Expiring",
              value: "Option4",
            },
            {
              label: "Unpaid",
              value: "Option4",
            },
            {
              label: "Active",
              value: "Option4",
            },
          ]}
          size="regular"
          title=""
          variant="contained"
          width={null}
        />
      </div>

      <PlansTablePattern
        // selectors={apiSelector}
        reset={false}
        tabledata={filteredPlans}
        filteredTableData={(e) => {}}
      />
    </div>
  );
};

export default PlanPage;
