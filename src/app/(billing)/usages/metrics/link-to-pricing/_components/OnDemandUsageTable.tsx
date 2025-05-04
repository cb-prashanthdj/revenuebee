"use client";

// OnDemandUsageTable.tsx
import {
  SelectMenu,
  SelectItem,
  Input as InputField,
  STable as Table,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "cb-sting-react-ts";
import { InfoIcon } from "lucide-react";
import { Info, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useFrequencyStore } from "./../../../_store/frequency-store";

interface FrequencyData {
  name: string;
  active_pricing: string;
  last_modified: string;
}

export const OnDemandUsageTable = () => {
  const {
    selectedItems,
    modifiedCurrencies,
    handleDrawer,
    addSelectedItem,
    removeSelectedItem,
  } = useFrequencyStore();

  const [tableData, setTableData] = useState<FrequencyData[]>([
    {
      name: "Additional AI agent conversations",
      active_pricing: "Monthly ",
      last_modified: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => {
    const isChecked = event.target.checked;

    // if (isChecked) {
    //   addSelectedItem(item);
    // } else {
    //   removeSelectedItem(item);
    // }
  };

  return (
    <Table mode="light" border="full" className="border rounded-2xl">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell className="bg-neutral-50 font-inter font-medium !text-[14px]">
            Addon
          </Table.HeaderCell>
          <Table.HeaderCell className="bg-neutral-50 font-inter font-medium !text-[14px]">
            Active pricing
          </Table.HeaderCell>
          <Table.HeaderCell className="bg-neutral-50 font-inter font-medium !text-[14px]">
            Last modified{" "}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {tableData.map((item, itemIndex) => (
          <Table.Row key={`${item}`}>
            <Table.Cell className="">{item.name}</Table.Cell>
            <Table.Cell className="flex gap-2">
              {item.active_pricing}
              <Popover modal>
                <PopoverTrigger asChild>
                  <button className=" hover:bg-neutral-100 rounded-full">
                    <InfoIcon className="size-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  alignOffset={5}
                  arrowColour="s-fill-primary-50"
                  className="bg-white shadow-md flex p-2 s-text-center s-rounded-lg"
                  side="right"
                  sideOffset={5}
                >
                  <div className="flex flex-col items-start text-regular">
                    $0.20 / conversation
                  </div>
                </PopoverContent>
              </Popover>
            </Table.Cell>
            <Table.Cell className="">{item.last_modified}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
