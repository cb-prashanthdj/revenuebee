"use client";
import {
  SelectMenu,
  SelectItem,
  Input as InputField,
  STable as Table,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "cb-sting-react-ts";

import React, { useState } from "react";
import { UsageItemsTable } from "./UsageItemsTable";
import { UsagePlansTable } from "./UsagePlansTable";
import { UsageAddonsTable } from "./UsageAddonsTable";

const ItemsToLink = () => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <div className="w-full">
              <InputField
                iconName=""
                inputSize="large"
                label="default"
                onChangeLogic={() => {}}
                placeholder="Search for a items from your product catalog"
                type="text"
                variant="search"
                withIcon
              />
            </div>
          </div>
          <UsageItemsTable />
        </div>
      </div>
    </div>
  );
};
const PlansToLink = () => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <div className="w-full">
              <InputField
                iconName=""
                inputSize="large"
                label="default"
                onChangeLogic={() => {}}
                placeholder="Search for a plan from your product catalog"
                type="text"
                variant="search"
                withIcon
              />
            </div>
          </div>
          <UsagePlansTable />
        </div>
      </div>
    </div>
  );
};
const AddonsToLink = () => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <div className="w-full">
              <InputField
                iconName=""
                inputSize="large"
                label="default"
                onChangeLogic={() => {}}
                placeholder="Search for a addon from your product catalog"
                type="text"
                variant="search"
                withIcon
              />
            </div>
          </div>
          <UsageAddonsTable />
        </div>
      </div>
    </div>
  );
};
export { ItemsToLink, PlansToLink, AddonsToLink };
