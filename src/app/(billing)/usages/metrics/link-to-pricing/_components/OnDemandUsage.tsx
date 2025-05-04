"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input as InputField,
  SelectItem,
  SelectMenu,
} from "cb-sting-react-ts";

import { OnDemandUsageTable } from "./OnDemandUsageTable";

const OnDemandUsage = () => {
  return (
    <div className="py-2">
      <div className="space-y-2">
        <div className="">
          For the metered items below, price based on usage will be linked to
          the feature
        </div>
        <div className="w-2/3">
          <div className="flex  mb-4 gap-2">
            <div>
              <SelectMenu
                label="inline"
                labelText="Item Type:"
                onValueChange={() => {}}
                placeholder="All"
                size="regular"
                value="Test"
                widthMenu="inline"
              >
                <SelectItem value="Option">All</SelectItem>
                <SelectItem value="Option 1">Option 1</SelectItem>
                <SelectItem value="Option 2">Option 2</SelectItem>
                <SelectItem value="Option 3">Option 3</SelectItem>
              </SelectMenu>
            </div>
            <div className="w-1/4 ml-auto ">
              <InputField
                iconName=""
                inputSize="regular"
                inputWidth="inline"
                label="default"
                onChangeLogic={() => {}}
                placeholder="Search item"
                type="text"
                variant="search"
                withIcon
              />
            </div>
            <div className="w-1/6">
              <Button size="regular" styleType={"outline"} fullWidth={true}>
                {" "}
                <PlusIcon className="size-4" />
                Add Item
              </Button>
            </div>
          </div>
          <OnDemandUsageTable />
        </div>
      </div>
    </div>
  );
};

export { OnDemandUsage };
