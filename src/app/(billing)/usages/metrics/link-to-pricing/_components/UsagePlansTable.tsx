"use client";

// UsagePlansTable.tsx
import {
  SelectMenu,
  SelectItem,
  Input as InputField,
  STable as Table,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "cb-sting-react-ts";
import { Info, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useFrequencyStore } from "./../../../_store/frequency-store";

interface FrequencyData {
  name: string;
  type: string;
  family: string;
  isChecked: boolean;
}

export const UsagePlansTable = () => {
  const {
    selectedItems,
    modifiedCurrencies,
    handleDrawer,
    addSelectedItem,
    removeSelectedItem,
  } = useFrequencyStore();

  const [tableData, setTableData] = useState<FrequencyData[]>([
    { name: "Essential", type: "Plan", family: "Help desk", isChecked: true },
    { name: "Advanced", type: "Plan", family: "Help desk", isChecked: false },
    { name: "Expert", type: "Plan", family: "Help desk", isChecked: false },
  ]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => {
    const isChecked = event.target.checked;

    setTableData((prevData) => {
      const newData = [...prevData];
      newData[itemIndex].isChecked = isChecked;
      return newData;
    });
  };

  return (
    <Table mode="light" border="full" className="border rounded-2xl">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell className="font-semibold">
            <input
              type="checkbox"
              // checked={frequency.isChecked}

              className={`rounded border-neutral-300 w-4 h-4`}
            />
          </Table.HeaderCell>
          <Table.HeaderCell>Plan</Table.HeaderCell>
          <Table.HeaderCell>Product family </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {tableData.map((item, itemIndex) => (
          <Table.Row key={`${item}`}>
            <Table.Cell className="leading-[0]">
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={(e) => handleCheckboxChange(e, itemIndex)}
                className={`rounded border-neutral-300 w-4 h-4 `}
              />
            </Table.Cell>
            <Table.Cell className="">{item.name}</Table.Cell>
            <Table.Cell className="">{item.family}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
